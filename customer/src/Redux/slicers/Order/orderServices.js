import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (idCustomer, thunkAPI) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/customer/orders/${idCustomer}`);
        return response.data.orders; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network Error');
      }
    }
  );
  export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (placedOrder, thunkAPI) => {
      try {
         console.log()
        const response = await axios.post(`${process.env.REACT_APP_URL}/orders/`, placedOrder);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );