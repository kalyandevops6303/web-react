import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: null,
  notificationsLoading: false,
  notificationCount: false,
  error: null,
  notificationsPolling: null,
  notificationsPollingLoading: false,
  markNotificationAsReadLoading: false,
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

    notificationsPollingRequest: (state) => ({
      ...state,
      notificationsPollingLoading: true,
      error: null,
    }),
    notificationsPollingSuccess: (state, action) => ({
      ...state,
      notificationsPolling: action.payload,
      notificationsPollingLoading: false,
    }),
    notificationsPollingFailure: (state, action) => ({
      ...state,
      notificationsPollingLoading: false,
      error: action.payload,
    }),

    markNotificationAsReadRequest: (state) => ({
      ...state,
      markNotificationAsReadLoading: true,
      error: null,
    }),
    markNotificationAsReadSuccess: (state) => ({
      ...state,
      markNotificationAsReadLoading: false,
    }),
    markNotificationAsReadFailure: (state, action) => ({
      ...state,
      markNotificationAsReadLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  notificationsRequest,
  notificationsSuccess,
  notificationCount,
  notificationsFailure,
  clearNotificationsData,
  notificationsPollingRequest,
  notificationsPollingSuccess,
  notificationsPollingFailure,
  markNotificationAsReadRequest,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
