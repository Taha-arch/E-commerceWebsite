import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authServices';

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
        state.token = action.payload.access_Token;
        state.error = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.customer = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
