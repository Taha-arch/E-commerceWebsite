import { createSlice } from '@reduxjs/toolkit';
import { fetchProductDetails } from './productServices'

const initialState = {
    productDetails: null,
    loading: false,
    error: null,
};


const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
        state.productDetails = null;
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});
export const { clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;