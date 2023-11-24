// editUserSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { updateUserDetails } from './useServices';

// Define the initial state
const initialState = {
  loading: false,
  user: null,
  error: null,
};



// Create the editUserSlice
const editUserSlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default editUserSlice.reducer;
