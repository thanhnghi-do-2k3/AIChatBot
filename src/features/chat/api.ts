import {APIEndpoint} from 'constant/APIEndPoint';
import {httpRequestServices} from 'services/http.service';

const aiChatService = {
  sendMessage: async (data: AiChatPayloadData) => {
    try {
      console.log('Post payload:', data);
      const response = await httpRequestServices.post(
        APIEndpoint.DoAIChat,
        data,
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getOldChatHistory: async (conversationId: string) => {
    try {
      const endpoint = `${APIEndpoint.GetConversations}/${conversationId}/messages`;
      const response = await httpRequestServices.get(endpoint, {
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
