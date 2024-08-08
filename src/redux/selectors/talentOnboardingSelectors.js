import { createSelector } from '@reduxjs/toolkit';

const talentOnboardingSelector = (state) => state.talentOnboarding;

export const userDetails = createSelector(talentOnboardingSelector, (talentOnboarding) => talentOnboarding.userDetails);

export const resumeParsedDetails = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.resumeParsedDetails,
);

export const userDetailsLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.userDetailsLoading,
);

export const resumeParsedDetailsLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.resumeParsedDetailsLoading,
);

export const talentAccountDetailsLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.accountDetailsLoading,
);

export const profileDetailsLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.profileDetailsLoading,
);

export const checkpointCompleteLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.checkpointCompleteLoading,
);

export const deleteResumeLoading = createSelector(
  talentOnboardingSelector,
  (talentOnboarding) => talentOnboarding.deleteResumeLoading,
);

