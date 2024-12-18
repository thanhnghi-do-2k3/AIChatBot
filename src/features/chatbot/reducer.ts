import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listChatbot: any[];
}

const initialState: InitialState = {
  loading: false,
  listChatbot: [],
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    createChatbot: (state, action) => {
      state.loading = true;
    },
    createChatbotSuccess: (state, action) => {
      state.loading = false;
    },
    createChatbotFailure: (state, action) => {
      state.loading = false;
    },

    getChatbot: (state, action) => {
      state.loading = true;
    },
    getChatbotSuccess: (state, action) => {
      state.loading = false;
      state.listChatbot = action.payload.data;
    },
    getChatbotFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const chatbotActions = chatbotSlice.actions;
export default chatbotSlice.reducer;
