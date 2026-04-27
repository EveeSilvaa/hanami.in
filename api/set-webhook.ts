export default async function handler(req: any, res: any) {
  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const webhookUrl = `https://${req.headers.host}/api/telegram-webhook`;

  if (!botToken) {
    return res.status(500).json({ error: 'Bot token not found in Vercel environment' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
