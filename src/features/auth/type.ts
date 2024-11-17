type initialState = {
  user: any;
  loading: boolean;
  error: string;
};

type RegisterPayload = PayloadAction & {
  username: string;
  email: string;
  password: string;
};

type LoginPayload = PayloadAction & {
  email: string;
  password: string;
};
