import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import productReducer from '../slicers/Product/productDetailsSlice'


const rootReducer = combineReducers({
  productDetails: productReducer
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;