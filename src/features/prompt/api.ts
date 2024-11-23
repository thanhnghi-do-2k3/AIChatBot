import {APIEndpoint} from 'constant/APIEndPoint';
import {create} from 'react-test-renderer';
import {apiServices} from 'api';

const promptService = {
  getPrompts: async (data: GetPromptsPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList;
      const response = await apiServices.get(endpoint, data);
      //console.log('Get prompt list response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  createPrompt: async (data: createPromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList;
      const response = await apiServices.post(endpoint, data);
      console.log('Create prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  makeFavoritePrompt: async (data: MakeFavoritePromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList + '/' + data.id + '/favorite';
      const response = await apiServices.post(endpoint);
      console.log('Make favorite prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  deletePrompt: async (data: DeletePromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList + '/' + data.id;
      const response = await apiServices.delete(endpoint);
      console.log('Delete prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  updatePrompt: async (data: UpdatePromptPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList + '/' + data.id;
      const response = await apiServices.patch(endpoint, data);
      console.log('Update prompt response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default promptService;
