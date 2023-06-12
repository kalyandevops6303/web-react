import { createSelector } from '@reduxjs/toolkit';

const dashboardSelector = (state) => state.dashboard;

const userData = createSelector(dashboardSelector, (dashboard) => dashboard.userData);

const userDataLoading = createSelector(dashboardSelector, (dashboard) => dashboard.userDataLoading);

export { userData, userDataLoading };
