import {KB_APIEndpoint} from 'constant/APIEndPoint';
import {kb_httpRequestServices} from 'services/http.service';
import reactotron from '../../../ReactotronConfig';

const KbService = {
  createKb: async (data: CreateKbPayloadData) => {
    try {
      const response = await kb_httpRequestServices.post(
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
      const response = await kb_httpRequestServices.get(
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
      const response = await kb_httpRequestServices.get(endpoint);
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
      const response = await kb_httpRequestServices.post(endpoint, data);
      console.log('Add URL to KB response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default KbService;
