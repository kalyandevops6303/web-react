import { createSelector } from '@reduxjs/toolkit';

const createBidSelector = (state) => state.createBid;

export const checkBidLoading = createSelector(createBidSelector, (createBid) => createBid.checkBidLoading);

export const createBidLoading = createSelector(createBidSelector, (createBid) => createBid.createBidLoading);
