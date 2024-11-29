type InitialStateConversation = {
  loading: boolean;
  error: boolean;
  conversations: ConversationItem[];
  cursor: string | null;
  hasMore: boolean;
};

type ConversationItem = {
  title: string;
  id: string;
  createdAt: number; // Unix timestamp
};

type ConversationResponse = {
  cursor: string;
  has_more: boolean;
  limit: number;
  items: ConversationItem[];
};
