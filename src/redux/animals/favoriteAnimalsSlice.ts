import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FavoriteAnimalsState = {
  ids: string[];
};

const initialState: FavoriteAnimalsState = {
  ids: [],
};

const favoriteAnimalsSlice = createSlice({
  name: 'favoriteAnimals',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeId: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
    toggleId: (state, action: PayloadAction<string>) => {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter(id => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
    },
    clearIds: (state) => {
      state.ids = [];
    },
  },
});

export const { addId, removeId, toggleId, clearIds } = favoriteAnimalsSlice.actions;
export const favoriteAnimalsReducer = favoriteAnimalsSlice.reducer;
