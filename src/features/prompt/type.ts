type GetPromptsPayloadData = {
  category: string;
  query: string;
  isFavorite: boolean;
  isPublic: boolean;
};

type GetPromptsPayload = PayloadActions & {
  data: GetPromptsPayloadData;
};

type createPromptPayloadData = {
  title: string;
  content: string;
  description: string;
  category: string;
  isPublic: boolean;
};

type CreatePromptPayload = PayloadActions & {
  data: createPromptPayloadData;
};

type MakeFavoritePromptPayloadData = {
  id: string;
};

type MakeFavoritePromptPayload = PayloadActions & {
  data: MakeFavoritePromptPayloadData;
};
