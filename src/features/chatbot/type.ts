type CreateChatBotPayloadData = {
  assistantName: string;
  instructions: string;
  description: string;
};

type CreateChatBotPayload = PayloadActions & {
  data: CreateChatBotPayloadData;
};
