import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listKb: any[];
  currentKbUnits: any[];
}

const initialState: InitialState = {
  loading: false,
  listKb: [],
  currentKbUnits: [],
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

    deleteKb: (state, action) => {
      state.loading = true;
    },
    deleteKbSuccess: (state, action) => {
      state.loading = false;
    },
    deleteKbFailure: (state, action) => {
      state.loading = false;
    },

    getUnitsKb: (state, action) => {
      state.loading = true;
    },
    getUnitsKbSuccess: (state, action) => {
      state.loading = false;
      state.currentKbUnits = action.payload.data;
    },
    getUnitsKbFailure: (state, action) => {
      state.loading = false;
    },

    addUrlToKb: (state, action) => {
      state.loading = true;
    },
    addUrlToKbSuccess: (state, action) => {
      state.loading = false;
    },
    addUrlToKbFailure: (state, action) => {
      state.loading = false;
    },

    addLocalFileToKb: (state, action) => {
      state.loading = true;
    },

    addLocalFileToKbSuccess: (state, action) => {
      state.loading = false;
    },
    addLocalFileToKbFailure: (state, action) => {
      state.loading = false;
    },
    addSlackToKb: (state, action) => {
      state.loading = true;
    },
    addSlackToKbSuccess: (state, action) => {
      state.loading = false;
    },
    addSlackToKbFailure: (state, action) => {
      state.loading = false;
    },
    addConfluenceToKb: (state, action) => {
      state.loading = true;
    },
    addConfluenceToKbSuccess: (state, action) => {
      state.loading = false;
    },
    addConfluenceToKbFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const kbActions = kbSlice.actions;
export default kbSlice.reducer;
