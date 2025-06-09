import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { animalsApi, type Animal } from './animalsApi';
import type { RootState } from '../store';
import { logoutThunk } from '../users/usersOperations';

export type FavoriteAnimalsState = {
  animals: Animal[];
  isLoading: boolean;
};

const initialState: FavoriteAnimalsState = {
  animals: [],
  isLoading: false,
};

const favoriteAnimalsSlice = createSlice({
  name: 'favoriteAnimals',
  initialState,
  selectors: {
    selectFavoriteAnimals: state => state.animals,
    selectFavoritesLoading: state => state.isLoading,
  },
  reducers: {
    setFavorites(state, action: PayloadAction<Animal[]>) {
      state.animals = action.payload.filter(animal => !animal.isHidden);
    },
    addAnimal: (state, action: PayloadAction<Animal>) => {
      const exists = state.animals.find(a => a.id === action.payload.id);
      if (!exists) {
        state.animals.push(action.payload);
      }
    },
    removeAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter(a => a.id !== action.payload);
    },
    toggleAnimal: (state, action: PayloadAction<Animal>) => {
      const exists = state.animals.find(a => a.id === action.payload.id);
      if (exists) {
        state.animals = state.animals.filter(a => a.id !== action.payload.id);
      } else {
        state.animals.push(action.payload);
      }
    },
    clearFavorites: state => {
      state.animals = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logoutThunk.fulfilled, state => {
        favoriteAnimalsSlice.caseReducers.clearFavorites(state);
      })
      .addMatcher(
        animalsApi.endpoints.deleteMyAnimals.matchFulfilled,
        (state, action) => {
          const deletedId = action.meta.arg.originalArgs;
          state.animals = state.animals.filter(a => a.id !== deletedId);
        }
      );
  },
});

export const {
  setFavorites,
  addAnimal,
  removeAnimal,
  toggleAnimal,
  clearFavorites,
} = favoriteAnimalsSlice.actions;
export const favoriteAnimalsReducer = favoriteAnimalsSlice.reducer;
export const { selectFavoriteAnimals, selectFavoritesLoading } =
  favoriteAnimalsSlice.selectors;

const selectAnimals = (state: RootState) => state.favoriteAnimals.animals;

export const selectFavoriteIds = createSelector([selectAnimals], animals =>
  animals.map(a => a.id)
);
