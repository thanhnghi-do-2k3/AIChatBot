type EmailSuggestionPayloadData = {
  action: string;
  metadata: EmailSuggestionMeta;

  email: string;
};

type EmailSuggestionMeta = {
  context: Array<string>;
  subject: string;
  sender: string;
  receiver: string;
  language: string;
};

type EmailSuggestionPayload = PayloadActions & {
  data: EmailSuggestionPayloadData;
};


type EmailResponsePayloadData = {
  action: string;
  metadata: EmailResponseMeta;
  mainIdea: string;
  email: string;
};

type EmailResponseMeta = {
  context: Array<string>;
  subject: string;
  sender: string;
  receiver: string;
  language: string;
};

type EmailResponseType = {
  length: string;
  formality: string;
  tone: string;
};

type EmailResponsePayload = PayloadActions & {
  data: EmailResponsePayloadData;
};