import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:3001/customers/login', { email, password });
      const { access_token, refreshtoken } = response.data;
  
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refreshtoken);
      
      return response.data;
    } catch (error) {
      alert(error)
      throw error
    }
  });
  
  
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('Card');
  });