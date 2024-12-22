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

type AddUrlToKbPayloadData = {
  id: string;
  unitName: string;
  webUrl: string;
};

type AddUrlToKbPayload = PayloadActions & {
  data: AddUrlToKbPayloadData;
};
