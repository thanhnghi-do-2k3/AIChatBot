import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isGlobalLoadingShow: false,
  isGlobalErrorShow: false,
  globalErrorMessage: 'Đã xảy ra lỗi',
  globalErrorHeader: 'Thông báo',
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
      state.globalErrorMessage = action.payload.message || 'Đã xảy ra lỗi';
      state.globalErrorHeader = action.payload.header || 'Thông báo';
    },
    hideGlobalError: state => {
      state.isGlobalErrorShow = false;
      state.globalErrorMessage = 'Đã xảy ra lỗi';
      state.globalErrorHeader = 'Thông báo';
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
