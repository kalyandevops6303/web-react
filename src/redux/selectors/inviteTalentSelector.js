import { createSelector } from '@reduxjs/toolkit';

const inviteTalentSelector = (state) => state.inviteTalent;

export const bestTalents = createSelector(inviteTalentSelector, (inviteTalent) => inviteTalent.bestTalents);

export const bestTalentsLoading = createSelector(
  inviteTalentSelector,
  (inviteTalent) => inviteTalent.bestTalentsLoading,
);

export const favoriteTalents = createSelector(inviteTalentSelector, (inviteTalent) => inviteTalent.favoriteTalents);

export const favoriteTalentsLoading = createSelector(
  inviteTalentSelector,
  (inviteTalent) => inviteTalent.favoriteTalentsLoading,
);

export const almaMaterTalents = createSelector(inviteTalentSelector, (inviteTalent) => inviteTalent.almaMaterTalents);

export const almaMaterTalentsLoading = createSelector(
  inviteTalentSelector,
  (inviteTalent) => inviteTalent.almaMaterTalentsLoading,
);

export const inviteTalentsLoading = createSelector(
  inviteTalentSelector,
  (inviteTalent) => inviteTalent.inviteTalentsLoading,
);
