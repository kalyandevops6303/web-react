import { createSelector } from '@reduxjs/toolkit';

const projectDetailsSelector = (state) => state?.projectDetails;

export const projectDetails = createSelector(projectDetailsSelector, (state) => state.projectDetails);

export const projectDetailsLoading = createSelector(projectDetailsSelector, (state) => state.projectDetailsLoading);

export const removeWorkerLoading = createSelector(projectDetailsSelector, (state) => state.removeWorkerLoading);

// Contract flow

export const selectIsNDA = createSelector(projectDetailsSelector, (state) => state?.isNDA);

export const selectIsContract = createSelector(projectDetailsSelector, (state) => state?.isContract);

export const selectDocument = createSelector(projectDetailsSelector, (state) => state?.document);

export const selectContractTimeline = createSelector(projectDetailsSelector, (state) => state?.contractTimeline);

export const selectNDATimeline = createSelector(projectDetailsSelector, (state) => state?.ndaTimeline);

export const relistProjectByDateLoading = createSelector(
  projectDetailsSelector,
  (state) => state.relistProjectByDateLoading,
);
