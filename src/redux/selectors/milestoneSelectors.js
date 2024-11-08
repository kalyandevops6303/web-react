import { createSelector } from '@reduxjs/toolkit';

const mileStoneSelector = (state) => state.milestone;

export const draftMilestonesData = createSelector(mileStoneSelector, (milestone) => milestone.draftMilestonesData);

export const draftMilestoneLoading = createSelector(mileStoneSelector, (milestone) => milestone.draftMilestoneLoading);

export const isDeleteDraftMilestoneLoading = createSelector(
  mileStoneSelector,
  (milestone) => milestone.isDeleteDraftMilestoneLoading,
);

export const draftArtifactsLoading = createSelector(mileStoneSelector, (milestone) => milestone.draftArtifactsLoading);
