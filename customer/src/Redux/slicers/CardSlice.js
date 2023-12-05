import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [], // Initial state for cards
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    clearCards: (state) => {
      state.cards = [];
      state.loading = false;
      state.error = null;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload); // Assuming payload is the new card object
    },
    removeCard: (state, action) => {
      // Assuming action.payload is the ID of the card to remove
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
  },
});

export const { clearCards, addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
