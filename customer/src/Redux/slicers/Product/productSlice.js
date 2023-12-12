import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './productServices'

const initialState = {
    product: null,
    loading: false,
    error: null,
};


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with products';
      });
  },
});

export default productSlice.reducer;