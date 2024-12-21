import {apiServices} from 'api';
import {APIEndpoint} from 'constant/APIEndPoint';
import reactotron from '../../../ReactotronConfig';

const EmailService = {
  //   createKb: async (data: CreateKbPayloadData) => {
  //     try {
  //       const response = await kbApiServices.post(
  //         KB_APIEndpoint.CreateKnowledgeBase,
  //         data,
  //       );
  //       reactotron.log('Create KB response from API:', response);

  //       return response;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  getEmailSuggestion: async (data: EmailSuggestionPayloadData) => {
    try {
      const response = await apiServices.post(
        APIEndpoint.EmailSuggestions,
        data,
      );
      reactotron.log('Get Email suggestion response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default EmailService;
