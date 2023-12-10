import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './registerservice';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default registerSlice.reducer;