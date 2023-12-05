import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
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
export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (productId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        console.log(response.data.data)
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );