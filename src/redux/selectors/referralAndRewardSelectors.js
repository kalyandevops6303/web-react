import { createSelector } from '@reduxjs/toolkit';

const referralAndRewardSelector = (state) => state.referralAndReward;

export const createReferralLoading = createSelector(
  referralAndRewardSelector,
  (referralAndReward) => referralAndReward.createReferralLoading,
);

export const validateReferralLoading = createSelector(
  referralAndRewardSelector,
  (referralAndReward) => referralAndReward.validateReferralLoading,
);
