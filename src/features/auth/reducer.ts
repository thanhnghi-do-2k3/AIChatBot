import {createSlice} from '@reduxjs/toolkit';

const initialState: initialState = {
  user: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
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
  },
});

export const {loginRequest, loginSuccess, loginFailure} = authSlice.actions;
export default authSlice.reducer;
