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
  isFavorite: boolean;
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

type DeletePromptPayloadData = {
  id: string;
};

type DeletePromptPayload = PayloadActions & {
  data: DeletePromptPayloadData;
};

type UpdatePromptPayloadData = {
  id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  isPublic: boolean;
  isFavorite: boolean;
};

type UpdatePromptPayload = PayloadActions & {
  data: UpdatePromptPayloadData;
};
