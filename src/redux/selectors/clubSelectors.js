import { createSelector } from '@reduxjs/toolkit';

const clubSelector = (state) => state.clubs;

// eslint-disable-next-line import/prefer-default-export
export const selectClubData = createSelector(clubSelector, (club) => club.clubs);

export const selectCreatedClubData = createSelector(clubSelector, (club) => club.clubCreated);

export const selectDraftClubData = createSelector(clubSelector, (club) => club.draftClub);

export const saveDraftClubLoading = createSelector(clubSelector, (club) => club.saveDraftClubLoading);

export const updateClubLoading = createSelector(clubSelector, (club) => club.updateClubLoading);

export const getDraftClubLoading = createSelector(clubSelector, (club) => club.getDraftClubLoading);

export const deleteDraftClubLoading = createSelector(clubSelector, (club) => club.deleteDraftClubLoading);

export const clubLocalData = createSelector(clubSelector, (club) => club.clubLocalData);