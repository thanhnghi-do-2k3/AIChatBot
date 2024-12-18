import {apiServices} from 'api';
import {APIEndpoint} from 'constant/APIEndPoint';

const aiChatService = {
  sendMessage: async (data: AiChatPayloadData) => {
    try {
      console.log('Post payload:', data);
      const response = await apiServices.post(APIEndpoint.DoAIChat, data);
      //console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getOldChatHistory: async (conversationId: string) => {
    try {
      const endpoint = `${APIEndpoint.GetConversations}/${conversationId}/messages`;
      const response = await apiServices.get(endpoint, {
        assistantId: 'gpt-4o-mini',
        assistantModel: 'dify',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default aiChatService;
