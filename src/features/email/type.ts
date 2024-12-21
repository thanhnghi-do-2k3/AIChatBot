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
