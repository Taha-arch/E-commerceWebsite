import { createSlice } from '@reduxjs/toolkit';
import { login, logout, purgePersistedState } from './authServices';
import { updateCustomer } from '../Customer/customerServices';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    customer: null,
    token: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.status = 'succeeded';
        state.token = action.payload.access_token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.customer = null;
        state.error = action.payload.error;
        state.status = 'failed';
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.customer = null;
        state.token = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
