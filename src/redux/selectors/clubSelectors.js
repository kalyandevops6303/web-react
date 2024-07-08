import { createSelector } from '@reduxjs/toolkit';

const teamSelector = (state) => state.team;

// eslint-disable-next-line import/prefer-default-export
export const selectClubData = createSelector(teamSelector, (club) => club.clubs);

export const selectDraftClubData = createSelector(teamSelector, (team) => team.draftClub);

export const selectCreatedClubData = createSelector(teamSelector, (team) => team.clubCreated);

export const saveDraftClubLoading = createSelector(teamSelector, (team) => team.saveDraftClubLoading);

export const updateClubLoading = createSelector(teamSelector, (team) => team.updateClubLoading);

export const getDraftClubLoading = createSelector(teamSelector, (team) => team.getDraftClubLoading);

export const deleteDraftClubLoading = createSelector(teamSelector, (team) => team.deleteDraftClubLoading);
