import {kbApiServices} from 'api';
import {KB_APIEndpoint} from 'constant/APIEndPoint';
import reactotron from '../../../ReactotronConfig';

const KbService = {
  createKb: async (data: CreateKbPayloadData) => {
    try {
      const response = await kbApiServices.post(
        KB_APIEndpoint.CreateKnowledgeBase,
        data,
      );
      reactotron.log('Create KB response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getKb: async () => {
    try {
      const response = await kbApiServices.get(
        KB_APIEndpoint.GetKnowledgeBase,
        {},
      );
      reactotron.log('Get KB response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getUnitsKb: async (data: GetUnitsKbPayloadData) => {
    try {
      const endpoint =
        KB_APIEndpoint.GetKnowledgeBase + '/' + data.id + '/units';
      const response = await kbApiServices.get(endpoint);
      console.log('Get KB Units response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
  addUrlToKb: async (data: AddUrlToKbPayloadData) => {
    try {
      console.log('data from add url to kb', data);
      const endpoint = KB_APIEndpoint.GetKnowledgeBase + '/' + data.id + '/web';
      const response = await kbApiServices.post(endpoint, data);
      console.log('Add URL to KB response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default KbService;
