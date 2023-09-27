import { createSelector } from '@reduxjs/toolkit';

const referralAndRewardSelector = (state) => state.referralAndReward;

// eslint-disable-next-line import/prefer-default-export
export const createReferralLoading = createSelector(
  referralAndRewardSelector,
  (referralAndReward) => referralAndReward.createReferralLoading,
);
