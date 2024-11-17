import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

const initialState: initialState = {
  user: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = '';
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Register actions
    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = '';
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
