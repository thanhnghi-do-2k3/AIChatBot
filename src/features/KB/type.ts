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
