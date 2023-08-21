import { createSelector } from '@reduxjs/toolkit';

const teamSelector = (state) => state.team;

// eslint-disable-next-line import/prefer-default-export
export const selectTeamData = createSelector(teamSelector, (team) => team.teams);
