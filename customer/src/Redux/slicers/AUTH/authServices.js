import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { persistor } from "../../..";
import { toast } from 'react-toastify';




export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/customers/login`, { email, password });
    const { access_token, refreshtoken } = response.data;
    
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refreshtoken);

    return response.data;
  } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  
  export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
  });

  export const purgePersistedState = createAsyncThunk('auth/purgePersistedState', async () => {
    try {
      await persistor.purge(); 
      return true; 
    } catch (error) {
      console.error("Error purging persisted state:", error);
      throw error;
    }
  });