import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubcategories = createAsyncThunk(
    'subcategories/fetchSubcategories ',
    async (thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:3001/subcategories`);
        return response.data.subcategories;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


