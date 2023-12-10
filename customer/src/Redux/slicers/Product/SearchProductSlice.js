import { createSlice } from '@reduxjs/toolkit';
import { fetchProductFound } from './productServices'

const initialState = {
    productFound: null,
    loading: false,
    error: null,
};


const productsFoundSlice = createSlice({
  name: 'productFound',
  initialState,
  reducers: {
    clearProductFound: (state) => {
      state.productFound = null;
      state.loading = false;
      state.error = null;
    },
  },
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

export const { clearProductFound } = productsFoundSlice.actions;
export default productsFoundSlice.reducer;