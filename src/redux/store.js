import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import layout from './layout';
import navbar from './navbar';

const rootReducer = combineReducers({
  auth: authReducer,
  layout,
  navbar,

  // Add more reducers if needed
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
