import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  userDataLoading: false,
  recommendedProjects: null,
  recommendedProjectsLoading: false,
  profilePercentage: null,
  profilePercentageLoading: false,
  projectInvites: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    userDataRequest: (state) => ({
      ...state,
      userDataLoading: true,
      error: null,
    }),
    userDataSuccess: (state, action) => ({
      ...state,
      userData: action.payload,
      userDataLoading: false,
    }),
    userDataFailure: (state, action) => ({
      ...state,
      userDataLoading: false,
      error: action.payload,
    }),

    recommendedProjectsRequest: (state) => ({
      ...state,
      recommendedProjectsLoading: true,
      error: null,
    }),
    recommendedProjectsSuccess: (state, action) => ({
      ...state,
      recommendedProjects: action.payload,
      recommendedProjectsLoading: false,
    }),
    recommendedProjectsFailure: (state, action) => ({
      ...state,
      recommendedProjectsLoading: false,
      error: action.payload,
    }),

    profilePercentageRequest: (state) => ({
      ...state,
      profilePercentageLoading: true,
      error: null,
    }),
    profilePercentageSuccess: (state, action) => ({
      ...state,
      profilePercentage: action.payload,
      profilePercentageLoading: false,
    }),
    profilePercentageFailure: (state, action) => ({
      ...state,
      profilePercentageLoading: false,
      error: action.payload,
    }),

    getProjectInvitesSuccess: (state, action) => ({
      ...state,
      projectInvites: action.payload,
    }),

    clearData: (state) => ({
      ...state,
      userData: null,
      userDataLoading: false,
      recommendedProjects: null,
      recommendedProjectsLoading: false,
      profilePercentage: null,
      profilePercentageLoading: false,
      error: null,
    }),
  },
});

export const {
  userDataRequest,
  userDataSuccess,
  userDataFailure,
  recommendedProjectsRequest,
  recommendedProjectsSuccess,
  recommendedProjectsFailure,
  profilePercentageRequest,
  profilePercentageSuccess,
  profilePercentageFailure,
  getProjectInvitesSuccess,
  clearData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
