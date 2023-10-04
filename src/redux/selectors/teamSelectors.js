import { createSelector } from '@reduxjs/toolkit';

const teamSelector = (state) => state.team;

// eslint-disable-next-line import/prefer-default-export
export const selectTeamData = createSelector(teamSelector, (team) => team.teams);

export const selectCreatedTeamData = createSelector(teamSelector, (team) => team.teamCreated);

export const updateTeamLoading = createSelector(teamSelector, (team) => team.updateTeamLoading);
