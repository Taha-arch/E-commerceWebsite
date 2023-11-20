import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD

import rootReducer from './Reducers/index';
export const store = configureStore({
  reducer: rootReducer
});

export default store;
=======
import userSlice from './slicers/userSlice';
import customerSlice from './slicers/customers/customerSlice';

const store = configureStore({
  reducer:{
    user: userSlice,
    customer: customerSlice,
  }
  
  });

export default store;
>>>>>>> 39e7ad7467c41d87e7924d9c7b708d9a7e00d5ff
