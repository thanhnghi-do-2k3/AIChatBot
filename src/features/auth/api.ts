import {apiServices} from 'api';
import APIEndPoint from 'constant/APIEndPoint';

const authServices = {
  register: async (data: RegisterPayload) => {
    try {
      const response = await apiServices.post(APIEndPoint.SignUp, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  login: async (data: LoginPayload) => {
    try {
      const response = await apiServices.post(APIEndPoint.SignIn, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authServices;
