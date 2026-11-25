const token = process.env.ZALO_BOT_TOKEN?.trim();
if (!token) {
  console.error("Thêm ZALO_BOT_TOKEN vào .env.local trước khi chạy lệnh.");
  process.exitCode = 1;
} else {
  try {
    const botApi = `https://bot-api.zaloplatforms.com/bot${encodeURIComponent(token)}`;
    const webhookResponse = await fetch(`${botApi}/getWebhookInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(10_000),
    });
    const webhook = await webhookResponse.json();
    if (webhook.ok && webhook.result?.url) {
      console.error("Bot đang dùng webhook. Hãy lấy chat ID từ sự kiện webhook hoặc gỡ webhook trước khi dùng getUpdates.");
      process.exit(1);
    }
    const response = await fetch(`${botApi}/getUpdates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeout: "25" }),
      signal: AbortSignal.timeout(30_000),
    });
    const data = await response.json();
    const chat = data.result?.message?.chat;
    if (!response.ok || data.ok !== true || !chat?.id) {
      console.error("Chưa lấy được chat ID. Nhắn một tin trong cuộc trò chuyện với bot và thử lại. getUpdates dùng cho bot chưa cài webhook.");
      process.exitCode = 1;
    } else {
      console.log(`ZALO_CHAT_ID=${chat.id}`);
    }
  } catch {
    console.error("Không kết nối được Zalo Bot API.");
    process.exitCode = 1;
  }
}
