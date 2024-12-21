import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listIdeas: any[];
}

const initialState: InitialState = {
  loading: false,
  listIdeas: [],
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    getEmailSuggestion: (state, action) => {
      state.loading = true;
    },
    getEmailSuggestionSuccess: (state, action) => {
      state.loading = false;
      state.listIdeas = action.payload.ideas;
    },
    getEmailSuggestionFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
