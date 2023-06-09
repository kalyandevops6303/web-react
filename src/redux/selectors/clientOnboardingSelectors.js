import { createSelector } from '@reduxjs/toolkit';

const clientOnboardingSelector = (state) => state.clientOnboarding;

export const clientAccountDetailsLoading = createSelector(
  clientOnboardingSelector,
  (clientOnboarding) => clientOnboarding.accountDetailsLoading,
);

export const profileDetailsLoading = createSelector(
  clientOnboardingSelector,
  (clientOnboarding) => clientOnboarding.profileDetailsLoading,
);
