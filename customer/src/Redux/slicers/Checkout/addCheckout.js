import { createSlice } from '@reduxjs/toolkit';
import { addCheckout } from './checkoutServices';


const initialState = {
    checkout: null,
    loading: false,
    error: null,
};


const addCheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    clearCheckout: (state) => {
        state.checkout = null;
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCheckout.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.checkout = action.payload;
        state.error = null;
      })
      .addCase(addCheckout.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with checkout';
      });
  },
});

export default addCheckoutSlice.reducer;