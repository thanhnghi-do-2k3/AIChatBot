type CreateKbPayloadData = {
  knowledgeName: string;

  description: string;
};

type CreateKbPayload = PayloadActions & {
  data: CreateKbPayloadData;
};

type GetUnitsKbPayloadData = {
  id: string;
};

type GetUnitsKbPayload = PayloadActions & {
  data: GetUnitsKbPayloadData;
};

type DeleteKbPayloadData = {
  id: string;
};

type DeleteKbPayload = PayloadActions & {
  data: DeleteKbPayloadData;
};

type AddUrlToKbPayloadData = {
  id: string;
  unitName: string;
  webUrl: string;
};

type AddUrlToKbPayload = PayloadActions & {
  data: AddUrlToKbPayloadData;
};

type addLocalFileToKbPayloadData = {
  id: string;
  file: any;
};

type addLocalFileToKbPayload = PayloadActions & {
  data: addLocalFileToKbPayloadData;
};

type addSlackToKbPayloadData = {
  id: string;
  unitName: string;
  slackWorkspace: string;
  slackBotToken: string;
};

type addSlackToKbPayload = PayloadActions & {
  data: addSlackToKbPayloadData;
};

type addConfluenceToKbPayloadData = {
  id: string;
  unitName: string;
  wikiPageUrl: string;
  confluenceUsername: string;
  confluenceAccessToken: string;
};

type addConfluenceToKbPayload = PayloadActions & {
  data: addConfluenceToKbPayloadData;
};
