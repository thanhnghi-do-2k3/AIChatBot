import {apiServices, kbApiServices} from 'api';
import {APIEndpoint, KB_APIEndpoint} from 'constant/APIEndPoint';

const authService = {
  // Register a new user
  register: async (data: RegisterPayloadData) => {
    try {
      const response = await apiServices.post(APIEndpoint.SignUp, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (data: LoginPayloadData) => {
    try {
      const response = await apiServices.post(APIEndpoint.SignIn, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  loginForKB: async (data: {token: string}) => {
    try {
      const response = await kbApiServices.post(KB_APIEndpoint.SignIn, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiServices.get(APIEndpoint.SignOut);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
