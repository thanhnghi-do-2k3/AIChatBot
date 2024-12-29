import {APIEndpoint} from 'constant/APIEndPoint';
import { create } from 'react-test-renderer';
import {httpRequestServices} from 'services/http.service';

const promptService = {
  getPrompts: async (data: GetPromptsPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList;
      const response = await httpRequestServices.get(endpoint, data);
      //console.log('Get prompt list response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  createPrompt: async (data: createPromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList;
      const response = await httpRequestServices.post(endpoint, data);
      console.log('Create prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  makeFavoritePrompt: async (data: MakeFavoritePromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList + '/' + data.id + '/favorite';
      const response = await httpRequestServices.post(endpoint);
      console.log('Make favorite prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default promptService;
