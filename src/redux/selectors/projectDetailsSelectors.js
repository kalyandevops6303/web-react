import { createSelector } from '@reduxjs/toolkit';

const projectDetailsSelector = (state) => state.projectDetails;

export const projectDetails = createSelector(projectDetailsSelector, (state) => state.projectDetails);

export const projectDetailsLoading = createSelector(projectDetailsSelector, (state) => state.projectDetailsLoading);
