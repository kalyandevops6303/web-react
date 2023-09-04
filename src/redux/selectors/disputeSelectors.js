import { createSelector } from '@reduxjs/toolkit';

const disputeSelector = (state) => state.dispute;

export const raiseDisputeLoading = createSelector(disputeSelector, (dispute) => dispute.raiseDisputeLoading);

export const allDisputesLoading = createSelector(disputeSelector, (dispute) => dispute.allDisputesLoading);

export const allDisputes = createSelector(disputeSelector, (dispute) => dispute.allDisputes);

export const acceptDisputeLoading = createSelector(disputeSelector, (dispute) => dispute.acceptDisputeLoading);

export const replyOnDisputeLoading = createSelector(disputeSelector, (dispute) => dispute.replyOnDisputeLoading);
