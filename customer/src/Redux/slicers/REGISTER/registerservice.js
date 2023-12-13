import axios from 'axios';
import { toast } from 'react-toastify'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/customers`, userData);
        return response.data; 
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  );