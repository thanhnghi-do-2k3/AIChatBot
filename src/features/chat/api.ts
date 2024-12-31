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

  getOldChatHistory: async (conversationId: any) => {
    try {
      const endpoint = `${APIEndpoint.GetConversations}/${conversationId.id}/messages`;
      console.log('Get old chat history endpoint:', endpoint);
      const response = await httpRequestServices.get(endpoint, {
        assistantModel: 'dify',
        assistantId: 'gpt-4o-mini',
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default aiChatService;
