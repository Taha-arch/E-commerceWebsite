import { createSlice } from '@reduxjs/toolkit';
import { fetchProductDetails } from './productServices'

const initialState = {
    productSubcategory: null,
    loading: false,
    error: null,
};


const productSubcategorySlice = createSlice({
  name: 'productSubcategory',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
        state.productSubcategory = null;
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
        state.productSubcategory = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default productSubcategorySlice.reducer;