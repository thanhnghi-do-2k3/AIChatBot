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
  history: [],
};

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    resetState: () => initialState,
    sendMessageRequest: (state, action: PayloadAction<AiChatPayload>) => {
      state.loading = true;
      //generate random id
      const randomId = Math.random().toString(36).substring(7);
      state.history = [
        ...(state.history || []),

        {
          id: randomId,
          sender: 'User',
          content: action.payload.data.content,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } as Message,
      ];
    },
    sendMessageSuccess: (state, action: PayloadAction<AiChatResponse>) => {
      console.log('sendMessageSuccess', action.payload);
      state.loading = false;
      //generate random id
      const randomId = Math.random().toString(36).substring(7);
      state.message = {
        id: randomId,
        sender: 'AI',
        content: action.payload.message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      } as Message;
      state.history = [
        ...(state.history || []),

        {
          id: Math.random().toString(36).substring(7),
          sender: 'AI',
          content: action.payload.message,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } as Message,
      ];
      state.conversationId = action.payload.conversationId;
      state.remainingUsage = action.payload.remainingUsage;
    },
    sendMessageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = {
        id: Math.random().toString(36).substring(7),
        sender: 'AI',
        content: 'Unexpected error. Please try again later.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      } as Message;
    },

    getOldChatHistoryRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.conversationId = action.payload.id;
    },

    getOldChatHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = {
        id: Math.random().toString(36).substring(7),
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
      console.log('getOldChatHistorySuccess', action.payload);
      //tạo của user
      const userMessages = action.payload.items.map(historyItem => {
        return {
          id: Math.random().toString(36).substring(7),
          sender: 'User',
          content: historyItem.query,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } as Message;
      });

      //tạo của AI
      const aiMessages = action.payload.items.map(historyItem => {
        return {
          id: Math.random().toString(36).substring(7),
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
      console.log('state.history', state.history);
    },
  },
});

export const aiChatActions = aiChatSlice.actions;
export default aiChatSlice.reducer;
