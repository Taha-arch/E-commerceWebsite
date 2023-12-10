import { createSlice } from '@reduxjs/toolkit';
import { login, logout, purgePersistedState } from './authServices';
import { updateCustomer } from '../Customer/customerServices';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    customer: null,
    token: null,
    status: 'idle',
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.status = 'succeeded';
        state.token = action.payload.access_token;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.customer = null;
        state.status = 'failed';
        state.error = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.customer = null;
        state.token = null;
        state.error = false;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
      });
  },
});

export default authSlice.reducer;
