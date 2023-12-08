import { createSlice } from '@reduxjs/toolkit';
import { fetchProductFound } from './productServices'
// Define the initial state
const initialState = {
    productFound: null,
    loading: false,
    error: null,
};

// Create the userDetailSlice
const productsFoundSlice = createSlice({
  name: 'productFound',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductFound.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFound.fulfilled, (state, action) => {
        state.loading = false;
        state.productFound = action.payload;
        state.error = null;
      })
      .addCase(fetchProductFound.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default productsFoundSlice.reducer;