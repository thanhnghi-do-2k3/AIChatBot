import {apiServices} from 'api';
import {APIEndpoint} from 'constant/APIEndPoint';

const conversationService = {
  fetchConversations: async () => {
    try {
      const response = await apiServices.get(APIEndpoint.GetConversations, {
        assistantId: 'gpt-4o-mini',
        assistantModel: 'dify',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default conversationService;
