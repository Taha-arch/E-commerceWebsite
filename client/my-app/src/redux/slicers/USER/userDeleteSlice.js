import { createSlice } from '@reduxjs/toolkit';
import { deleteUser } from './useServices';



const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userDeleteSlice.reducer;
