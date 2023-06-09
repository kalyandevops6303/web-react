import { createSelector } from '@reduxjs/toolkit';

const dashboardSelector = (state) => state.dashboard;

const userDataLoading = createSelector(dashboardSelector, (dashboard) => dashboard.userDataLoading);

export default userDataLoading;
