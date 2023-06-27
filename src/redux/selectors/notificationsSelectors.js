import { createSelector } from '@reduxjs/toolkit';

const notificationsSelector = (state) => state.notifications;

const notifications = createSelector(notificationsSelector, (dashboard) => dashboard.notifications);

const notificationsLoading = createSelector(notificationsSelector, (dashboard) => dashboard.notificationsLoading);

export { notifications, notificationsLoading };
