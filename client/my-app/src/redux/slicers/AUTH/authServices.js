import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify'

export const login = createAsyncThunk('auth/login', async ({ user_name, password }) => {
    try {
      const response = await axios.post('https://prestigious-02dr.onrender.com/login', { user_name, password });
      const { access_Token, refresh_Token } = response.data;
  
      localStorage.setItem('accessToken', access_Token);
      localStorage.setItem('refreshToken', refresh_Token);
      
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  });
  
  
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  });