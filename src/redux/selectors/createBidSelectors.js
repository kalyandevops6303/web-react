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
