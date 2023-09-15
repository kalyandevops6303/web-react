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
  almaMaterTalents: null,
  almaMaterTalentsLoading: false,
  inviteTalentsLoading: false,
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
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  almaMaterTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  inviteTalentsFailure,
} = createProjectSlice.actions;

export default createProjectSlice.reducer;
