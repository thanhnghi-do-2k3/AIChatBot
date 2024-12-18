import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listKb: any[];
}

const initialState: InitialState = {
  loading: false,
  listKb: [],
};

const kbSlice = createSlice({
  name: 'kb',
  initialState,
  reducers: {
    createKb: (state, action) => {
      state.loading = true;
    },
    createKbSuccess: (state, action) => {
      state.loading = false;
    },
    createKbFailure: (state, action) => {
      state.loading = false;
    },

    getKb: (state, action) => {
      state.loading = true;
    },
    getKbSuccess: (state, action) => {
      state.loading = false;
      state.listKb = action.payload.data;
    },
    getKbFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const kbActions = kbSlice.actions;
export default kbSlice.reducer;
