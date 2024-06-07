import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createProject: null,
  createProjectUsingAI: null,
  createProjectLoading: false,
  createProjectAILoading: false,
  bestTalents: null,
  bestTalentsLoading: false,
  favoriteTalents: null,
  favoriteTalentsLoading: false,
  favoriteTeams: null,
  favoriteTeamsLoading: false,
  almaMaterTalents: null,
  almaMaterTalentsLoading: false,
  inviteTalentsLoading: false,
  saveDraftProjectLoading: false,
  saveDraftProjectId: null,
  draftProjectsCheckLoading: false,
  deleteDraftProjectLoading: false,
  draftProjectDetailsLoading: false,
  draftProjectDetails: null,
  error: null,
};

const createProjectSlice = createSlice({
  name: 'createProject',
  initialState,
  reducers: {
    createProjectRequest: (state) => ({
      ...state,
      createProjectLoading: true,
      error: null,
    }),
    createProjectSuccess: (state, action) => ({
      ...state,
      createProjectLoading: false,
      createProject: action.payload,
    }),
    createProjectFailure: (state, action) => ({
      ...state,
      createProjectLoading: false,
      error: action.payload,
    }),

    createProjectAIRequest: (state) => ({
      ...state,
      createProjectAILoading: true,
      error: null,
    }),
    createProjectAISuccess: (state, action) => ({
      ...state,
      createProjectAILoading: false,
      createProjectUsingAI: action.payload,
    }),
    createProjectAIFailure: (state, action) => ({
      ...state,
      createProjectAILoading: false,
      error: action.payload,
    }),

    clearCreateProjectData: (state) => ({
      ...state,
      createProjectLoading: false,
      createProject: null,
      bestTalents: null,
      bestTalentsLoading: false,
      favoriteTalents: null,
      favoriteTalentsLoading: false,
      favoriteTeams: null,
      favoriteTeamsLoading: false,
      almaMaterTalents: null,
      almaMaterTalentsLoading: false,
    }),

    bestTalentsRequest: (state) => ({
      ...state,
      bestTalentsLoading: true,
      error: null,
    }),
    bestTalentsSuccess: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      bestTalents: action.payload,
    }),
    bestTalentsFailure: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      error: action.payload,
    }),

    favoriteTalentsRequest: (state) => ({
      ...state,
      favoriteTalentsLoading: true,
      error: null,
    }),
    favoriteTalentsSuccess: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      favoriteTalents: action.payload,
    }),
    favoriteTalentsFailure: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      error: action.payload,
    }),

    favoriteTeamsRequest: (state) => ({
      ...state,
      favoriteTeamsLoading: true,
      error: null,
    }),
    favoriteTeamsSuccess: (state, action) => ({
      ...state,
      favoriteTeamsLoading: false,
      favoriteTeams: action.payload,
    }),
    favoriteTeamsFailure: (state, action) => ({
      ...state,
      favoriteTeamsLoading: false,
      error: action.payload,
    }),

    almaMaterTalentsRequest: (state) => ({
      ...state,
      almaMaterTalentsLoading: true,
      error: null,
    }),
    almaMaterTalentsSuccess: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      almaMaterTalents: action.payload,
    }),
    almaMaterTalentsFailure: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      error: action.payload,
    }),

    inviteTalentsRequest: (state) => ({
      ...state,
      inviteTalentsLoading: true,
      error: null,
    }),
    inviteTalentsSuccess: (state) => ({
      ...state,
      inviteTalentsLoading: false,
    }),
    inviteTalentsFailure: (state, action) => ({
      ...state,
      inviteTalentsLoading: false,
      error: action.payload,
    }),
    clearModalData: (state) => ({
      ...state,
      bestTalents: null,
      bestTalentsLoading: false,
      favoriteTalents: null,
      favoriteTalentsLoading: false,
      almaMaterTalents: null,
      almaMaterTalentsLoading: false,
    }),
    saveDraftProjectRequest: (state) => ({
      ...state,
      saveDraftProjectLoading: true,
      error: null,
    }),
    saveDraftProjectSuccess: (state, action) => ({
      ...state,
      saveDraftProjectLoading: false,
      saveDraftProjectId: action.payload,
    }),
    saveDraftProjectFailure: (state, action) => ({
      ...state,
      saveDraftProjectLoading: false,
      error: action.payload,
    }),
    clearSaveDraftProjectId: (state) => ({
      ...state,
      saveDraftProjectId: null,
    }),
    draftProjectsCheckRequest: (state) => ({
      ...state,
      draftProjectsCheckLoading: true,
      error: null,
    }),
    draftProjectsCheckSuccess: (state) => ({
      ...state,
      draftProjectsCheckLoading: false,
    }),
    draftProjectsCheckFailure: (state, action) => ({
      ...state,
      draftProjectsCheckLoading: false,
      error: action.payload,
    }),
    deleteDraftProjectRequest: (state) => ({
      ...state,
      deleteDraftProjectLoading: true,
      error: null,
    }),
    deleteDraftProjectSuccess: (state) => ({
      ...state,
      deleteDraftProjectLoading: false,
    }),
    deleteDraftProjectFailure: (state, action) => ({
      ...state,
      deleteDraftProjectLoading: false,
      error: action.payload,
    }),
    draftProjectDetailsRequest: (state) => ({
      ...state,
      draftProjectDetailsLoading: true,
      error: null,
    }),
    draftProjectDetailsSuccess: (state, action) => ({
      ...state,
      draftProjectDetailsLoading: false,
      draftProjectDetails: action.payload,
    }),
    draftProjectDetailsFailure: (state, action) => ({
      ...state,
      draftProjectDetailsLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  createProjectAIRequest,
  createProjectAISuccess,
  createProjectAIFailure,
  clearCreateProjectData,
  bestTalentsRequest,
  bestTalentsSuccess,
  bestTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  favoriteTalentsFailure,
  favoriteTeamsRequest,
  favoriteTeamsSuccess,
  favoriteTeamsFailure,
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  almaMaterTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  inviteTalentsFailure,
  clearModalData,
  saveDraftProjectRequest,
  saveDraftProjectSuccess,
  saveDraftProjectFailure,
  clearSaveDraftProjectId,
  draftProjectsCheckRequest,
  draftProjectsCheckSuccess,
  draftProjectsCheckFailure,
  deleteDraftProjectRequest,
  deleteDraftProjectSuccess,
  deleteDraftProjectFailure,
  draftProjectDetailsRequest,
  draftProjectDetailsSuccess,
  draftProjectDetailsFailure,
} = createProjectSlice.actions;

export default createProjectSlice.reducer;
