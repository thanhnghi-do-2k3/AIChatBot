import {kbApiServices} from 'api';
import {KB_APIEndpoint} from 'constant/APIEndPoint';
import reactotron from '../../../ReactotronConfig';

const ChatbotService = {
  createChatBot: async (data: CreateChatBotPayloadData) => {
    try {
      const response = await kbApiServices.post(
        KB_APIEndpoint.CreateAssistant,
        data,
      );
      reactotron.log('Create Chatbot:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getChatBot: async () => {
    try {
      const response = await kbApiServices.get(KB_APIEndpoint.GetAssistant, {});
      reactotron.log('Get Chatbot:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ChatbotService;
