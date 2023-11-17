import { combineReducers } from 'redux';
import userReducer from '../slicers/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;