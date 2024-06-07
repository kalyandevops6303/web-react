import { createSelector } from '@reduxjs/toolkit';

const createProjectSelector = (state) => state.createProject;

export const createProjectData = createSelector(createProjectSelector, (createProject) => createProject.createProject);

export const createProjectAIData = createSelector(
  createProjectSelector,
  (createProject) => createProject.createProjectUsingAI,
);

export const createProjectLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.createProjectLoading,
);

export const createProjectAILoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.createProjectAILoading,
);

export const bestTalents = createSelector(createProjectSelector, (createProject) => createProject.bestTalents);

export const bestTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.bestTalentsLoading,
);

export const favoriteTalents = createSelector(createProjectSelector, (createProject) => createProject.favoriteTalents);

export const favoriteTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.favoriteTalentsLoading,
);

export const favoriteTeams = createSelector(createProjectSelector, (createProject) => createProject.favoriteTeams);

export const favoriteTeamsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.favoriteTeamsLoading,
);

export const almaMaterTalents = createSelector(
  createProjectSelector,
  (createProject) => createProject.almaMaterTalents,
);

export const almaMaterTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.almaMaterTalentsLoading,
);

export const inviteTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.inviteTalentsLoading,
);

export const saveDraftProjectLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.saveDraftProjectLoading,
);

export const saveDraftProjectId = createSelector(
  createProjectSelector,
  (createProject) => createProject.saveDraftProjectId,
);

export const draftProjectsCheckLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.draftProjectsCheckLoading,
);

export const deleteDraftProjectLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.deleteDraftProjectLoading,
);

export const draftProjectDetailsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.draftProjectDetailsLoading,
);
