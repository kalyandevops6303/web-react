import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: null,
  notificationsLoading: false,
  notificationCount: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsRequest: (state) => ({
      ...state,
      notificationsLoading: true,
      error: null,
    }),
    notificationsSuccess: (state, action) => ({
      ...state,
      notifications: action.payload,
      notificationsLoading: false,
    }),
    notificationsFailure: (state, action) => ({
      ...state,
      notificationsLoading: false,
      error: action.payload,
    }),

    clearNotificationsData: (state) => ({
      ...state,
      notifications: null,
      notificationsLoading: false,
      notificationCount: false,
    }),
    notificationCount: (state, action) => ({
      ...state,
      notificationCount: action.payload,
    }),
  },
});

export const {
  notificationsRequest,
  notificationsSuccess,
  notificationCount,
  notificationsFailure,
  clearNotificationsData,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
