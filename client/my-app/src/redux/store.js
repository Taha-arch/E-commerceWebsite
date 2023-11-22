import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slicers/userSlice';
import customerSlice from './slicers/customers/customerSlice';

const store = configureStore({
  reducer:{
    user: userSlice,
    customer: customerSlice,
  }
  
  });

export default store;
