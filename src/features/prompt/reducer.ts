import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  listPrompts: any[];
}

const initialState: InitialState = {
  loading: false,
  listPrompts: [],
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    getPrompts: (state, action) => {
      state.loading = true;
    },
    getPromptsSuccess: (state, action) => {
      state.loading = false;
      state.listPrompts = action.payload.items;
    },
    getPromptsFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const promptActions = promptSlice.actions;
export default promptSlice.reducer;
