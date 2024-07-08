import { createSelector } from '@reduxjs/toolkit';

const teamSelector = (state) => state.team;

// eslint-disable-next-line import/prefer-default-export
export const selectTeamData = createSelector(teamSelector, (team) => team.teams);

export const selectDraftTeamData = createSelector(teamSelector, (team) => team.draftTeam);

export const selectCreatedTeamData = createSelector(teamSelector, (team) => team.teamCreated);

export const saveDraftTeamLoading = createSelector(teamSelector, (team) => team.saveDraftTeamLoading);

export const updateTeamLoading = createSelector(teamSelector, (team) => team.updateTeamLoading);

export const getDraftTeamLoading = createSelector(teamSelector, (team) => team.getDraftTeamLoading);

export const deleteDraftTeamLoading = createSelector(teamSelector, (team) => team.deleteDraftTeamLoading);
