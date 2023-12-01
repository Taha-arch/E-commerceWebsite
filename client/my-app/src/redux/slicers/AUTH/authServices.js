import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('auth/login', async ({ user_name, password }) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { user_name, password });
      const { access_Token, refresh_Token } = response.data;
  
      localStorage.setItem('accessToken', access_Token);
      localStorage.setItem('refreshToken', refresh_Token);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  });