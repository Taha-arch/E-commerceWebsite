import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import productReducer from '../slicers/Product/productSlice'
import productFoundReducer from '../slicers/Product/SearchProductSlice';
import categoriesReducer from '../slicers/Category/categorySlice';
import subcategoriesReducer from '../slicers/Subcategory/subcategorySlices';
import productDetailsReducer from '../slicers/Product/productDetailsSlice'
import CardReducer from '../slicers/CardSlice';
import authReducer from '../slicers/AUTH/authSlice';
import orderReducer from '../slicers/Order/orderSlice';
import customerUpdateReducer from '../slicers/Customer/customerUpdate'
import getCustomerIdReducer from '../slicers/Customer/customerById'
import productBySubcatReducer from '../slicers/productBySubcat';
import SearchQueryReducer from '../slicers/SearchQuery';

const rootReducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducer,
  Card: CardReducer,
  auth: authReducer,
  order: orderReducer,
  productsFound: productFoundReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  customerUpdate: customerUpdateReducer,
  customerId: getCustomerIdReducer,
  productBySubcategory: productBySubcatReducer,
  searchQuery: SearchQueryReducer,

});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth','Card'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;