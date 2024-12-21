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
      const response = await kbApiServices.get(KB_APIEndpoint.GetKnowledgeBase, {});
      reactotron.log('Get KB response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default KbService;
