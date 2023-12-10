import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCheckout = createAsyncThunk(
  "checkout/addCheckout",
  async ({ cartItems, customerId, navigate, search }, thunkAPI) => {
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/checkout";

    try {
      console.log(customerId);
      console.log("inside add checkout  " + cartItems);
      
      const response = await axios.post("http://localhost:3001/stripe/create-checkout-session", {
        cartItems,
        customerId,
      });

      if (response.data && response.data.url) {
        window.open(response.data.url, '_blank');
      }else{
        navigate(redirect);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
