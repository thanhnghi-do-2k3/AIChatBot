import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  message?: Message;
  conversationId?: string;
  remainingUsage?: number;
  history?: Message[];
}

const initialState: InitialState = {
  loading: false,
  message: undefined,
  conversationId: '',
  remainingUsage: 0,
};

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    sendMessageRequest: (state, action: PayloadAction<AiChatPayload>) => {
      state.loading = true;
    },
    sendMessageSuccess: (state, action: PayloadAction<AiChatResponse>) => {
      console.log('sendMessageSuccess', action.payload);
      state.loading = false;
      state.message = {
        id: '',
        sender: 'AI',
        content: action.payload.message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      } as Message;
      state.conversationId = action.payload.conversationId;
      state.remainingUsage = action.payload.remainingUsage;
    },
    sendMessageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = {
        id: '',
        sender: 'AI',
        content: 'Unexpected error. Please try again later.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      } as Message;
    },

    getOldChatHistoryRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },

    getOldChatHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = {
        id: '',
        sender: 'AI',
        content: 'Unexpected error. Please try again later.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      } as Message;
    },

    getOldChatHistorySuccess: (
      state,
      action: PayloadAction<AiChatHistoryResponse>,
    ) => {
      state.loading = false;
      //với mỗi history item, tạo 2 message: 1 của user, 1 của AI, của user là query, của AI là answer

      //tạo của user
      const userMessages = action.payload.history.map(historyItem => {
        return {
          id: '',
          sender: 'User',
          content: historyItem.query,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } as Message;
      });

      //tạo của AI
      const aiMessages = action.payload.history.map(historyItem => {
        return {
          id: '',
          sender: 'AI',
          content: historyItem.answer,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } as Message;
      });

      //merge 2 array lại với nhau
      const messages: Message[] = [];
      for (let i = 0; i < userMessages.length; i++) {
        messages.push(userMessages[i]);
        messages.push(aiMessages[i]);
      }

      state.history = messages;

      state.conversationId = action.payload.cursor;
    },
  },
});

export const aiChatActions = aiChatSlice.actions;
export default aiChatSlice.reducer;
