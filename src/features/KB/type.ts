type CreateKbPayloadData = {
  knowledgeName: string;

  description: string;
};

type CreateKbPayload = PayloadActions & {
  data: CreateKbPayloadData;
};
