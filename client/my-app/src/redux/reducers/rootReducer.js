import { combineReducers } from 'redux';
import userDetailReducer from '../slicers/USER/userDetailsSlice';
import updateUserReducer from '../slicers/USER/editUserSlice'
import userReducer from '../slicers/USER/userSlice';
import userDeleteReducer from '../slicers/USER/userDeleteSlice'
import authReducer from '../slicers/AUTH/authSlice'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
  user: userReducer,
  userDetails: userDetailReducer,
  userUpdate: updateUserReducer,
  userDelete: userDeleteReducer,
  auth: authReducer,
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
