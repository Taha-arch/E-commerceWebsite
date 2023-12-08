import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/`);
        return response.data; // Assuming response.data contains the orders array or object
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network Error');
      }
    }
  );
  export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (placedOrder, thunkAPI) => {
      try {
         
        const response = await axios.post(`http://localhost:3001/orders/`, placedOrder);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );