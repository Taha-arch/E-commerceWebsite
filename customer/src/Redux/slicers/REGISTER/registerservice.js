import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3001/customers', userData);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response.data); 
      }
    }
  );