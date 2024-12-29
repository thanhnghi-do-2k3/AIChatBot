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

    createPrompt: (state, action) => {
      state.loading = true;
    },
    createPromptSuccess: (state, action) => {
      state.loading = false;
    },
    createPromptFailure: (state, action) => {
      state.loading = false;
    },

    makeFavoritePrompt: (state, action) => {
      state.loading = true;

      //change isFavorite from listPrompts to opposite
      for (let i = 0; i < state.listPrompts.length; i++) {
        console.log('state.listPrompts[i]._id', state.listPrompts[i]._id);
        console.log('action.payload.data.id', action.payload.data.id);
        if (state.listPrompts[i]._id === action.payload.data.id) {
          state.listPrompts[i].isFavorite = !state.listPrompts[i].isFavorite;
          break;
        }
      }
    },
    makeFavoritePromptSuccess: (state, action) => {
      state.loading = false;
    },

    makeFavoritePromptFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const promptActions = promptSlice.actions;
export default promptSlice.reducer;
