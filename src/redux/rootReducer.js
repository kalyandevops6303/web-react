import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import chat from './reducers/chat';
import clubs from './reducers/clubs';
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
import createBid from './reducers/createBid';
import projectDetails from './reducers/projectDetails';
import team from './reducers/team';
import PaymentDetails from './reducers/paymentDetails';
import myTeams from './reducers/myTeams';
import project from './reducers/project';
import dispute from './reducers/dispute';
import rating from './reducers/rating';
import referralAndReward from './reducers/referralAndReward';
import stripeDetails from './reducers/stripeDetails';
import milestonePayment from './reducers/milestonePayment';
import activeNavTab from './reducers/activeNavTab';
import paymentFullView from './reducers/paymentFullView';

const rootReducer = combineReducers({
  auth: authReducer,
  chat,
  clubs,
  staticData: staticReducer,
  talentOnboarding: talentOnboardingReducer,
  clientOnboarding: clientOnboardingReducer,
  dashboard,
  currentProfile: profile,
  createProject,
  marketPlace,
  notifications,
  projectDetails,
  layout,
  navbar,
  team,
  search: gloabalSearch,
  createBid,
  PaymentDetails,
  inviteTalent,
  myTeams,
  project,
  dispute,
  rating,
  referralAndReward,
  stripeDetails,
  milestonePayment,
  activeNavTab,
  paymentFullView,
  // Add more reducers if needed
});

// Configure Redux Persist for the 'auth' reducer only
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'notifications'],
};

export default persistReducer(persistConfig, rootReducer);
