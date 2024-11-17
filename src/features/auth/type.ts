type initialState = {
  user: any;
  loading: boolean;
  error: string;
};

type RegisterPayloadData = {
  email: string;
  password: string;
  username: string;
};

type RegisterPayload = PayloadAction & {
  data: RegisterPayloadData;
};

type LoginPayloadData = {
  email: string;
  password: string;
};

type LoginPayload = PayloadAction & {
  data: LoginPayloadData;
};
