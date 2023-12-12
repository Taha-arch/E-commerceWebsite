import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, placeOrder } from './orderServices';

const initialState = {
    order: {},
    loading: false,
    error: null,
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
    })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default orderSlice.reducer;