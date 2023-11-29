import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (productId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );