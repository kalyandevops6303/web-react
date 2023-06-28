import { createSelector } from '@reduxjs/toolkit';

const dashboardSelector = (state) => state.dashboard;

const userData = createSelector(dashboardSelector, (dashboard) => dashboard.userData);

const userDataLoading = createSelector(dashboardSelector, (dashboard) => dashboard.userDataLoading);

const recommendedProjects = createSelector(dashboardSelector, (dashboard) => dashboard.recommendedProjects);

const recommendedProjectsLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.recommendedProjectsLoading,
);

const profilePercentage = createSelector(dashboardSelector, (dashboard) => dashboard.profilePercentage);

const profilePercentageLoading = createSelector(dashboardSelector, (dashboard) => dashboard.profilePercentageLoading);

export {
  userData,
  userDataLoading,
  recommendedProjects,
  recommendedProjectsLoading,
  profilePercentage,
  profilePercentageLoading,
};
