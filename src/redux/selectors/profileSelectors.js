import { createSelector } from '@reduxjs/toolkit';

const profileSelector = (state) => state.currentProfile;

// eslint-disable-next-line import/prefer-default-export
export const selectCurrentProfile = createSelector(profileSelector, (profile) => profile.userProfile);
export const selectLoading = createSelector(profileSelector, (profile) => profile.isLoading);
export const selectError = createSelector(profileSelector, (profile) => profile.error);
