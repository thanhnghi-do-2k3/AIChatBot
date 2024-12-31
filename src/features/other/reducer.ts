import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isGlobalLoadingShow: false,
  isGlobalErrorShow: false,
  isGlobalConfirmShow: false,
  globalErrorMessage: 'Đã xảy ra lỗi',
  globalErrorHeader: 'Thông báo',
  globalConfirmHeader: 'Thông báo',
  globalConfirmMessage: 'Bạn có chắc chắn muốn thực hiện hành động này?',
  onGlobalConfirmOk: () => {},
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
    showGlobalConfirm: (state, action) => {
      state.isGlobalConfirmShow = true;
      state.globalConfirmMessage =
        action.payload.message ||
        'Bạn có chắc chắn muốn thực hiện hành động này?';
      state.globalConfirmHeader = action.payload.header || 'Thông báo';
      state.onGlobalConfirmOk = action.payload.onConfirm;
    },
    hideGlobalConfirm: state => {
      state.isGlobalConfirmShow = false;
      state.globalConfirmMessage =
        'Bạn có chắc chắn muốn thực hiện hành động này?';
      state.globalConfirmHeader = 'Thông báo';
      state.onGlobalConfirmOk = () => {};
    },
  },
});

export const {
  showGlobalLoading,
  hideGlobalLoading,
  showGlobalError,
  hideGlobalError,
  showGlobalConfirm,
  hideGlobalConfirm,
} = otherSlice.actions;
export default otherSlice.reducer;
