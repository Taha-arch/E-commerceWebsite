import { combineReducers } from 'redux';
import productSlice from '../slicers/products/productSlice';


const rootReducer = combineReducers({
  product: productSlice,

});

export default rootReducer;