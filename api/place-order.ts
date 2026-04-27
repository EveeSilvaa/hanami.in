import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { customer_name, table_number, payment_method, items, total_price } = req.body

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ message: 'Missing database credentials' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // 1. Save to Supabase
  const { data: order, error } = await supabase
    .from('orders')
    .insert([
      { 
        customer_name, 
        table_number, 
        payment_method, 
        items, 
        total_price, 
        status: 'pendente' 
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Supabase Error:', error)
    return res.status(500).json({ message: 'Error saving order' })
  }

  // 2. Format Items for Telegram
  const itemsText = items.map((item: any) => 
    `➡ <b>${item.quantity}x</b> ${item.name} \n   └─ <i>${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</i>`
  ).join('\n\n');

  // 3. Construct Telegram Message with Buttons
  const message = `━━━━━ 🛍 <b>NOVO PEDIDO</b> ━━━━━\n\n` +
    `👤 <b>Cliente:</b> ${customer_name}\n` +
    `📍 <b>Mesa:</b> ${table_number}\n` +
    `💳 <b>Pagamento:</b> ${payment_method.toUpperCase()}\n\n` +
    `📋 <b>ITENS DO PEDIDO:</b>\n` +
    `────────────────────\n` +
    `${itemsText}\n` +
    `────────────────────\n\n` +
    `💰 <b>TOTAL: ${(total_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ <i>Enviado às: ${new Date().toLocaleTimeString('pt-BR')}</i>`;

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '👨‍🍳 Aceitar', callback_data: `status_preparando_${order.id}` },
              { text: '❌ Cancelar', callback_data: `status_cancelado_${order.id}` }
            ]
          ]
        }
      })
    });
    
    if (!tgResponse.ok) {
        const errorData = await tgResponse.text();
        console.error('Telegram API falhou. Retorno do Telegram:', errorData);
    }
  } catch (err) {
    console.error('Telegram fetch failed (rede/dns):', err);
  }


  return res.status(200).json({ orderId: order.id })
}
