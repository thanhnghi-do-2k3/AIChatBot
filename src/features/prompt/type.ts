type GetPromptsPayloadData = {
  category: string;
  query: string;
  isFavorite: boolean;
  isPublic: boolean;
};

type GetPromptsPayload = PayloadActions & {
  data: GetPromptsPayloadData;
};
