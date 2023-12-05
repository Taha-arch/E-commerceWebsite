import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import productReducer from '../slicers/Product/productSlice'
import productDetailsReducer from '../slicers/Product/productDetailsSlice'
import CardReducer from '../slicers/CardSlice';
import authReducer from '../slicers/AUTH/authSlice'


const rootReducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducer,
  Card: CardReducer,
  auth: authReducer
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth','Card'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;