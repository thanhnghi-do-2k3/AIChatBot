import {APIEndpoint} from 'constant/APIEndPoint';
import {httpRequestServices} from 'services/http.service';

const conversationService = {
  fetchConversations: async () => {
    try {
      const response = await httpRequestServices.get(
        APIEndpoint.GetConversations,
        {
          assistantId: 'gpt-4o-mini',
          assistantModel: 'dify',
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default conversationService;
