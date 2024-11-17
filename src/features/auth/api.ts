import {apiServices} from 'api';
import APIEndpoint from 'constant/APIEndpoint';

const authServices = {
  // Register a new user
  register: async (data: RegisterPayload) => {
    try {
      const response = await apiServices.post(APIEndpoint.SignUp, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (data: LoginPayload) => {
    try {
      const response = await apiServices.post(APIEndpoint.SignIn, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authServices;