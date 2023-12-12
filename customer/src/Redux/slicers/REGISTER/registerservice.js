import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/customers`, userData);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response.data); 
      }
    }
  );