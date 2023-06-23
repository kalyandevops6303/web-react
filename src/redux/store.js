import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import staticReducer from './reducers/static';
import talentOnboardingReducer from './reducers/talentOnboarding';
import clientOnboardingReducer from './reducers/clientOnboarding';
import dashboardReducer from './reducers/dashboard';
import layout from './layout';
import navbar from './navbar';
import profile from './reducers/profile';
import marketPlace from './reducers/marketPlace';

const rootReducer = combineReducers({
  auth: authReducer,
  staticData: staticReducer,
  talentOnboarding: talentOnboardingReducer,
  clientOnboarding: clientOnboardingReducer,
  dashboard: dashboardReducer,
  currentProfile: profile,
  marketPlace,
  layout,
  navbar,

  // Add more reducers if needed
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
