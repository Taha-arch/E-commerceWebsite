import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './reducers/rootReducer';




const store = configureStore({
    reducer: persistedReducer,
});



export default store;