import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { callback_query } = req.body

  if (!callback_query) {
    return res.status(200).json({ message: 'Not a callback query' })
  }

  const data = callback_query.data 
  // expected format: status_newstatus_orderid e.g. status_preparando_abcd-1234
  const [prefix, newStatus, orderId] = data.split('_')

  if (prefix !== 'status') {
    return res.status(200).json({ message: 'Unknown action' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ message: 'Missing credentials' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // 1. Update Supabase
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) {
    console.error('Update Error:', error)
  }

  // 2. Prepare next button states
  let nextButtons: any[] = []
  if (newStatus === 'preparando') {
    nextButtons = [[
      { text: '✅ Pronto', callback_data: `status_pronto_${orderId}` },
      { text: '❌ Cancelar', callback_data: `status_cancelado_${orderId}` }
    ]]
  } else if (newStatus === 'pronto') {
    nextButtons = [[
      { text: '🏁 Entregue', callback_data: `status_entregue_${orderId}` }
    ]]
  }

  // 3. Update the Telegram message
  const originalText = callback_query.message.text
  const userWhoActioned = callback_query.from.first_name || 'Alguém'
  
  const statusLabels: Record<string, string> = {
    preparando: '👨‍🍳 EM PREPARO',
    pronto: '✅ PRONTO PARA RETIRADA',
    entregue: '🏁 FINALIZADO',
    cancelado: '❌ CANCELADO'
  }

  // Clean previous status if exists to avoid stacking
  const cleanText = originalText.split('\n\n📌 Status:')[0]
  const updatedText = cleanText + `\n\n📌 *Status:* ${statusLabels[newStatus]}\n👤 *Por:* ${userWhoActioned}`

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: callback_query.message.chat.id,
        message_id: callback_query.message.message_id,
        text: updatedText,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: nextButtons
        }
      })
    });

    await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callback_query.id,
        text: `Pedido atualizado: ${statusLabels[newStatus]}`
      })
    });
  } catch (err) {
    console.error('Telegram update failed:', err)
  }

  return res.status(200).json({ ok: true })
}
