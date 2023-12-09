import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], 
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload); 
    },
    removeFavorite: (state, action) => {
      const removedCard = state.favorites.find((favorite) => favorite._id === action.payload);
      if (removedCard) {
        state.favorites = state.favorites.filter((favorite) => favorite._id !== action.payload);
      }
    },
  },
});

export const { clearFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
