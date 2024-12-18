import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  isLogged: boolean;
}

const initialState: InitialState = {
  loading: false,
  isLogged: false,
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
      state.loading = false;
      state.isLogged = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
    },

    // Register actions
    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
    },

    // Logout actions
    logoutRequest: (state, action) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = false;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
