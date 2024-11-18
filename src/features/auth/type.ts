type initialState = {
  loading: boolean;
};

type RegisterPayloadData = {
  email: string;
  password: string;
  username: string;
};

type RegisterPayload = PayloadActions & {
  data: RegisterPayloadData;
};

type ResgiterResponse = {
  user: User;
};

type LoginPayloadData = {
  email: string;
  password: string;
};

type LoginPayload = PayloadActions & {
  data: LoginPayloadData;
};

interface User {
  email: string;
  password: string;
  username: string;
  isActive: boolean;
  usedAuthOptions: string[];
  roles: string[];
  createdBy?: any;
  updatedBy?: any;
  hashedRefreshToken?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  id: string;
}
