import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCustomer = createAsyncThunk(
    'customerUpdate/updateCustomer',
    async ({id, updatedInfo }, thunkAPI) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/customers/${id}`, updatedInfo);
        return response.data.doc; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const getCustomerById = createAsyncThunk(
    'customerById/getCustomerById',
    async ({id }, thunkAPI) => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/customers/${id}`);
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

  
