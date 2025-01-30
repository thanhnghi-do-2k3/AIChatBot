interface TelegramVerificationPayload {
  token: string;
}

interface MessengerVerificationPayload {
  botToken: string;
  appSecret: string;
  pageId: string;
}

interface SlackVerificationPayload {
  token: string;
  clientId: string;
  clientSecret: string;
  signingSecret: string;
}
