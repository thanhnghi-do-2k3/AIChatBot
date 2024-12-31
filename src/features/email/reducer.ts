import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listIdeas: any[];
  emailResponse: string;
}

const initialState: InitialState = {
  loading: false,
  listIdeas: [],
  emailResponse: '',
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

    getEmailResponse: (state, action) => {
      state.loading = true;
    },
    getEmailResponseSuccess: (state, action) => {
      state.loading = false;
      state.emailResponse = action.payload.email;
    },
    getEmailResponseFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
