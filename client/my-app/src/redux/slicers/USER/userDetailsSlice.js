// userDetailSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './useServices';
// Define the initial state
const initialState = {
  userDetails: null,
  loading: false,
  error: null,
};



// Create the userDetailSlice
const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default userDetailSlice.reducer;
