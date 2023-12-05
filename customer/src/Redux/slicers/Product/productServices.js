import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
    'product/product/fetchProduct',
    async (thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/products/`);
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchProductFound = createAsyncThunk(
    'productFound/fetchProductFound',
    async (productName, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/products?product_name=${productName}`);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
