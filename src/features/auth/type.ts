type initialState = {
  user: any;
  loading: boolean;
  error: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};
