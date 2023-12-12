import { createSlice } from '@reduxjs/toolkit';
import { getCustomerById } from './customerServices';


const initialState = {
    customerById: null,
    loading: false,
    error: null,
};


const getCustomerSlice = createSlice({
  name: 'customerById',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
        state.customerById = null;
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customerById = action.payload;
        state.error = null;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with getting customer by Id';
      });
  },
});

export default getCustomerSlice.reducer;