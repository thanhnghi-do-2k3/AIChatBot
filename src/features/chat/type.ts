type InitialState = {
  loading: boolean;
  message?: Message;
  conversationId?: string;
  remainingUsage?: number;
  history?: Message[];
};
interface Message {
  id: string;
  sender: 'User' | 'AI';
  content?: string;
  image?: string;
  file?: {
    uri: string;
    name: string;
    type: string;
  };
  time: string;
  isTyping?: boolean;
}
type AiChatPayloadData = {
  content: string;
  metadata: {
    conversation: {
      id: string;
    };
  };
  assistant: {
    id: string;
    model: string;
    name: string;
  };
};

type AiChatPayload = PayloadActions & {
  data: AiChatPayloadData;
};

type AiChatResponse = {
  conversationId: string;
  message: string;
  remainingUsage: number;
};

type AiChatHistoryResponse = {
  history: HistoryItem[];
  limit: number;
  cursor?: string;
};

type HistoryItem = {
  answer: string;
  query: string;
};

type Conversation = {
  id: string;
};

type Assistant = {
  id: string;
  model: string;
  name: string;
};
