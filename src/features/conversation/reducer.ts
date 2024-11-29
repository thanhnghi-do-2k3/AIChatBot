import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

const initialState: InitialStateConversation = {
  loading: false,
  error: false,
  conversations: [],
  cursor: null,
  hasMore: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    fetchConversationsRequest(state) {
      state.loading = true;
    },
    fetchConversationsSuccess(
      state,
      action: PayloadAction<ConversationResponse>,
    ) {
      state.loading = false;
      state.conversations = action.payload.items;
      state.cursor = action.payload.cursor;
      state.hasMore = action.payload.has_more;
    },
    fetchConversationsFailure(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const conversationActions = conversationSlice.actions;
export default conversationSlice.reducer;
