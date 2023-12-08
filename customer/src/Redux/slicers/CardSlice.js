import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [], 
  totalCartPrice: 0,
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
      state.totalCartPrice = 0;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload); 
      state.totalCartPrice = state.cards.reduce((total, card) => total + parseFloat(card.totalPrice), 0);
      state.totalCartPrice = parseFloat(state.totalCartPrice.toFixed(2));
    },
    removeCard: (state, action) => {
      const removedCard = state.cards.find((card) => card._id === action.payload);
      if (removedCard) {
        state.cards = state.cards.filter((card) => card._id !== action.payload);
        state.totalCartPrice -= parseFloat(removedCard.totalPrice); 
        state.totalCartPrice = parseFloat(state.totalCartPrice.toFixed(2));
      }
    },
  },
});

export const { clearCards, addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
