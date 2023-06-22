import { createSelector } from '@reduxjs/toolkit';

const createProjectSelector = (state) => state.createProject;

export const createProjectData = createSelector(createProjectSelector, (createProject) => createProject.createProject);

export const createProjectLoading = createSelector(
  createProjectSelector,
  (createProject) => createProject.createProjectLoading,
);
