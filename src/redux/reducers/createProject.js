import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createProject: null,
  createProjectLoading: false,
  bestTalents: null,
  bestTalentsLoading: false,
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
  },
});

export const {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  bestTalentsRequest,
  bestTalentsSuccess,
  bestTalentsFailure,
} = createProjectSlice.actions;

export default createProjectSlice.reducer;
