import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
