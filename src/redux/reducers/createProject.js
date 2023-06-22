import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createProject: null,
  createProjectLoading: false,
  bestTalents: null,
  bestTalentsLoading: false,
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
  bestTalentsRequest,
  bestTalentsSuccess,
  bestTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  inviteTalentsFailure,
} = createProjectSlice.actions;

export default createProjectSlice.reducer;
