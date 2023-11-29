import { createSlice } from '@reduxjs/toolkit';
import { fetchProductDetails } from './productDetailsSlice'
// Define the initial state
const initialState = {
    productDetails: null,
    loading: false,
    error: null,
};

// Create the userDetailSlice
const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default productDetailSlice.reducer;