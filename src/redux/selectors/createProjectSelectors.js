import { createSelector } from '@reduxjs/toolkit';

const createProjectSelector = (state) => state.createProject;

export const createProjectData = createSelector(createProjectSelector, (createProject) => createProject.createProject);

export const createProjectLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.createProjectLoading,
);

export const bestTalents = createSelector(createProjectSelector, (createProject) => createProject.bestTalents);

export const bestTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.bestTalentsLoading,
);

export const inviteTalentsLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.inviteTalentsLoading,
);
