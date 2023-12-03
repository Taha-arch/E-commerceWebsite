import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
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
        console.log("product found" + response);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
