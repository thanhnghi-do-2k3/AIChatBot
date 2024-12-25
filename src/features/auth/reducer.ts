import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  isLogged: boolean;
  user: any;
}

const initialState: InitialState = {
  loading: false,
  isLogged: false,
  user: {},
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

    changeLoggedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },

    getCurrentUser: (state, action) => {
      state.loading = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getCurrentUserFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
