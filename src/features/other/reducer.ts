import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isGlobalLoadingShow: false,
  isGlobalErrorShow: false,
  globalErrorMessage: '',
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    showGlobalLoading: state => {
      state.isGlobalLoadingShow = true;
    },
    hideGlobalLoading: state => {
      state.isGlobalLoadingShow = false;
    },
    showGlobalError: (state, action) => {
      state.isGlobalErrorShow = true;
      state.globalErrorMessage = action.payload;
    },
    hideGlobalError: state => {
      state.isGlobalErrorShow = false;
      state.globalErrorMessage = '';
    },
  },
});

export const {
  showGlobalLoading,
  hideGlobalLoading,
  showGlobalError,
  hideGlobalError,
} = otherSlice.actions;
export default otherSlice.reducer;
