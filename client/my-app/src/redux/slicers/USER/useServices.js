import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
    .get('http://localhost:3001/users')
    .then((response) => response.data.data)
})




// Async thunk for updating user details
export const updateUserDetails = createAsyncThunk(
    'editUser/updateUserDetails',
    async (updatedUser, thunkAPI) => {
      try {
          console.log(updatedUser.Id)
        const response = await axios.put(`http://localhost:3001/users/${updatedUser.Id}`, updatedUser);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  // Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
    'userDetail/fetchUserDetails',
    async (userId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deleteUser = createAsyncThunk(
    'userDelete/deleteUser',
    async (userId, { dispatch }) => {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);
        dispatch(fetchUsers()); // Refresh the user list after deletion
      } catch (error) {
        console.error('Error deleting user data:', error);
      }
    }
  );
  