import { createSlice } from '@reduxjs/toolkit';
import { sortProduct } from './productServices'

const initialState = {
    sortProduct: null,
    loading: false,
    error: null,
};

const productsSortedSlice = createSlice({
  name: 'sortProduct',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
        state.sortProduct = null;
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sortProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sortProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.sortProduct = action.payload;
        state.error = null;
      })
      .addCase(sortProduct.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with sorted products';
      });
  },
});
export const { clearSortProduct } = productsSortedSlice.actions;
export default productsSortedSlice.reducer;