import {APIEndpoint} from 'constant/APIEndPoint';
import {httpRequestServices} from 'services/http.service';

const promptService = {
  getPrompts: async (data: GetUnitsKbPayloadData) => {
    try {
      const endpoint = APIEndpoint.PromptList;
      const response = await httpRequestServices.get(endpoint, data);
      //console.log('Get prompt list response from API:', response);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default promptService;
