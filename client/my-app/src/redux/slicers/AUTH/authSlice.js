import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authServices';
import { updateUserDetails } from '../USER/useServices';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = 'succeeded';
        state.token = action.payload.access_Token;
        state.role = action.payload.data.role;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
