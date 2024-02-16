import { createSelector } from '@reduxjs/toolkit';

const notificationsSelector = (state) => state.notifications;

const notifications = createSelector(notificationsSelector, (dashboard) => dashboard.notifications);

const notificationsLoading = createSelector(notificationsSelector, (dashboard) => dashboard.notificationsLoading);

const notificationsPolling = createSelector(notificationsSelector, (dashboard) => dashboard.notificationsPolling);

const notificationsPollingLoading = createSelector(
  notificationsSelector,
  (dashboard) => dashboard.notificationsPollingLoading,
);

const markNotificationAsReadLoading = createSelector(
  notificationsSelector,
  (dashboard) => dashboard.markNotificationAsReadLoading,
);

export {
  notifications,
  notificationsLoading,
  notificationsPolling,
  notificationsPollingLoading,
  markNotificationAsReadLoading,
};
