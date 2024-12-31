import {KB_APIEndpoint} from 'constant/APIEndPoint';
import {kb_httpRequestServices} from 'services/http.service';
import reactotron from '../../../ReactotronConfig';

const ChatbotService = {
  createChatBot: async (data: CreateChatBotPayloadData) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Assistant,
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
      const response = await kb_httpRequestServices.get(
        KB_APIEndpoint.Assistant,
        {},
      );
      reactotron.log('Get Chatbot:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteChatBot: async (id: string) => {
    try {
      const response = await kb_httpRequestServices.delete(
        KB_APIEndpoint.Assistant + '/' + id,
      );
      reactotron.log('Delete Chatbot:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateChatBot: async (id: string, data: CreateChatBotPayloadData) => {
    try {
      const response = await kb_httpRequestServices.patch(
        KB_APIEndpoint.Assistant + '/' + id,
        data,
      );
      reactotron.log('Update Chatbot:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getImportedKB: async (id: string) => {
    try {
      const response = await kb_httpRequestServices.get(
        KB_APIEndpoint.Assistant + '/' + id + KB_APIEndpoint.Assistant_KB,
        {},
      );
      reactotron.log('Get Imported KB:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  importKB: async (id: string, id_kb: string) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Assistant +
          '/' +
          id +
          KB_APIEndpoint.Assistant_KB +
          '/' +
          id_kb,
        {},
      );
      reactotron.log('Import KB:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  removeKB: async (id: string, id_kb: string) => {
    try {
      const response = await kb_httpRequestServices.delete(
        KB_APIEndpoint.Assistant +
          '/' +
          id +
          KB_APIEndpoint.Assistant_KB +
          '/' +
          id_kb,
      );
      reactotron.log('Remove KB:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  createNewThreadChat: async (data: any) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Assistant + KB_APIEndpoint.Thread,
        data,
      );
      reactotron.log('Create New Thread Chat:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  askAssistant: async (id: string, data: any) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Assistant + '/' + id + KB_APIEndpoint.Ask,
        data,
      );
      reactotron.log('Ask Assistant:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getMessageThreadChat: async (id_thread: string) => {
    try {
      const response = await kb_httpRequestServices.get(
        KB_APIEndpoint.Assistant +
          KB_APIEndpoint.Thread +
          '/' +
          id_thread +
          KB_APIEndpoint.Message +
          's',
        {},
      );
      reactotron.log('Get Message Thread Chat:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },

  getThread: async (id: string) => {
    try {
      const response = await kb_httpRequestServices.get(
        KB_APIEndpoint.Assistant + '/' + id + KB_APIEndpoint.Thread + 's',
        {},
      );
      reactotron.log('Get Thread:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ChatbotService;
