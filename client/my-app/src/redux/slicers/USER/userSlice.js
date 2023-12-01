import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './useServices';

const userInitialState = {
    loading: false,
    users: [],
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {}, // Add any specific reducers for userSlice here
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;


