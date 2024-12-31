import {KB_APIEndpoint} from 'constant/APIEndPoint';
import {kb_httpRequestServices} from 'services/http.service';

const ChatbotIntegrationService = {
  telegramIntegateVerification: async (data: TelegramVerificationPayload) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Telegram + '/validation',
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  telegramPublishBot: async (
    data: TelegramVerificationPayload,
    chatbotId: string,
  ) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Telegram + '/publish' + '/' + chatbotId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  slackIntegateVerification: async (data: SlackVerificationPayload) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Slack + '/validation',
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  slackPublishBot: async (
    data: SlackVerificationPayload,
    chatbotId: string,
  ) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Slack + '/publish' + '/' + chatbotId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  messengerIntegateVerification: async (data: MessengerVerificationPayload) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Messenger + '/validation',
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  messengerPublishBot: async (
    data: MessengerVerificationPayload,
    chatbotId: string,
  ) => {
    try {
      const response = await kb_httpRequestServices.post(
        KB_APIEndpoint.Messenger + '/publish' + '/' + chatbotId,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getConfigurations: async (chatbotId: string) => {
    try {
      console.log('chatbotId', chatbotId);
      const response = await kb_httpRequestServices.get(
        KB_APIEndpoint.Integration + '/' + chatbotId + '/configurations',
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  disableConfiguration: async (
    chatbotId: string,
    configurationType: 'messenger' | 'slack' | 'telegram',
  ) => {
    try {
      const response = await kb_httpRequestServices.delete(
        KB_APIEndpoint.Integration + '/' + chatbotId + '/' + configurationType,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ChatbotIntegrationService;
