import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsBySubcategory: [], // Initial state for products
  loading: false,
  error: null,
};

const productsSubcategorySlice = createSlice({
  name: 'productsBySubcategory',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.productsBySubcategory = [];
      state.loading = false;
      state.error = null;
    },
    addProducts: (state, action) => {
      state.productsBySubcategory.push(action.payload); 
    },
    removeProducts: (state, action) => {
      // Assuming action.payload is the ID of the card to remove
      state.productsBySubcategory = state.productsBySubcategory.filter((product) => product._id !== action.payload);
    },
  },
});

export const { clearProducts, addProducts, removeProducts } = productsSubcategorySlice.actions;
export default productsSubcategorySlice.reducer;
