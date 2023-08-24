import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import staticReducer from './reducers/static';
import talentOnboardingReducer from './reducers/talentOnboarding';
import clientOnboardingReducer from './reducers/clientOnboarding';
import layout from './layout';
import navbar from './navbar';
import profile from './reducers/profile';
import createProject from './reducers/createProject';
import inviteTalent from './reducers/inviteTalent';
import dashboard from './reducers/dashboard';
import marketPlace from './reducers/marketPlace';
import gloabalSearch from './reducers/gloabalSearch';
import notifications from './reducers/notifications';
import team from './reducers/team';

const rootReducer = combineReducers({
  auth: authReducer,
  staticData: staticReducer,
  talentOnboarding: talentOnboardingReducer,
  clientOnboarding: clientOnboardingReducer,
  dashboard,
  currentProfile: profile,
  createProject,
  marketPlace,
  notifications,
  layout,
  navbar,
  team,
  search: gloabalSearch,
  inviteTalent,

  // Add more reducers if needed
});

// Configure Redux Persist for the 'auth' reducer only
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'notifications'],
};

export default persistReducer(persistConfig, rootReducer);
