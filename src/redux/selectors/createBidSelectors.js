import { createSelector } from '@reduxjs/toolkit';

const createBidSelector = (state) => state.createBid;

export const checkBidLoading = createSelector(createBidSelector, (createBid) => createBid.checkBidLoading);

export const createBidLoading = createSelector(createBidSelector, (createBid) => createBid.createBidLoading);

export const projectDetails = createSelector(createBidSelector, (createBid) => createBid.projectDetails);

export const projectDetailsLoading = createSelector(createBidSelector, (createBid) => createBid.projectDetailsLoading);

export const bidDetails = createSelector(createBidSelector, (createBid) => createBid.bidDetails);

export const bidDetailsLoading = createSelector(createBidSelector, (createBid) => createBid.bidDetailsLoading);

export const recommendedRoles = createSelector(createBidSelector, (createBid) => createBid.recommendedRoles);

export const allTeamMembers = createSelector(createBidSelector, (createBid) => createBid.allTeamMembers);

export const rolesLoading = createSelector(createBidSelector, (createBid) => createBid.rolesLoading);

export const setWorkersLoading = createSelector(createBidSelector, (createBid) => createBid.setWorkersLoading);

export const draftSetWorkersLoading = createSelector(
  createBidSelector,
  (createBid) => createBid.draftSetWorkersLoading,
);

export const setMilestonesLoading = createSelector(createBidSelector, (createBid) => createBid.setMilestonesLoading);

export const draftSetMilestonesLoading = createSelector(
  createBidSelector,
  (createBid) => createBid.draftSetMilestonesLoading,
);

export const submitBidLoading = createSelector(createBidSelector, (createBid) => createBid.submitBidLoading);

export const changeBidTypeLoading = createSelector(createBidSelector, (createBid) => createBid.changeBidTypeLoading);

export const deleteDraftBidLoading = createSelector(createBidSelector, (createBid) => createBid.deleteDraftBidLoading);
