import { createSlice } from '@reduxjs/toolkit';
import { updateCustomer } from './customerServices';

// Define the initial state
const initialState = {
    customerUpdate: null,
    loading: false,
    error: null,
};

// Create the userDetailSlice
const updateCustomerSlice = createSlice({
  name: 'customerUpdate',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
        state.customerUpdate = null;
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customerUpdate  = action.payload;
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with updating customer';
      });
  },
});

export default updateCustomerSlice.reducer;