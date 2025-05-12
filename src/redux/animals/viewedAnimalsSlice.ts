import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Animal } from './animalsApi';
export interface ViewedAnimalsState {
  animals: Animal[];
}
const initialState: ViewedAnimalsState = {
  animals: [],
};

const viewedAnimalsSlice = createSlice({
  name: 'viewedAnimals',
  initialState,
  selectors: { selectViewedAnimals: state => state.animals },
  reducers: {
    addViewedAnimal: (state, action: PayloadAction<Animal>) => {
      const animal = action.payload;
      state.animals = state.animals.filter(a => a.id !== animal.id);
      state.animals.push(animal);
      if (state.animals.length > 6) {
        state.animals.shift();
      }
    },
    clearViewedAnimals: state => {
      state.animals = [];
    },
  },
});

export const { addViewedAnimal, clearViewedAnimals } =
  viewedAnimalsSlice.actions;
export const { selectViewedAnimals } = viewedAnimalsSlice.selectors;
export const viewedAnimalsReducer = viewedAnimalsSlice.reducer;
