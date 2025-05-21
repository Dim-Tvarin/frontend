import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Animal } from './animalsApi';
import { animalsApi } from './animalsApi';

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
    removeViewedAnimal: (state, action: PayloadAction<string>) => {
      const animalId = action.payload;
      state.animals = state.animals.filter(a => a.id !== animalId);
    },
    clearViewedAnimals: state => {
      state.animals = [];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      animalsApi.endpoints.deleteMyAnimals.matchFulfilled,
      (state, action) => {
        const deletedId = action.meta.arg.originalArgs;
        state.animals = state.animals.filter(a => a.id !== deletedId);
      }
    );
  },
});

export const { addViewedAnimal, removeViewedAnimal, clearViewedAnimals } =
  viewedAnimalsSlice.actions;
export const { selectViewedAnimals } = viewedAnimalsSlice.selectors;
export const viewedAnimalsReducer = viewedAnimalsSlice.reducer;
