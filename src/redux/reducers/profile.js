import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {},
  userRecentProject: [],
  userReview: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    getProfileSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      userProfile: action.payload,
    }),
    getProfileFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    makeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: true },
    }),
    makeTeamMemberSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_team_member: true },
    }),
    removeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: false },
    }),

    getRecentProjectRequest: (state) => ({
      ...state,
      isRecentProjectLoading: true,
      error: null,
    }),
    getRecentProjectSuccess: (state, action) => ({
      ...state,
      isRecentProjectLoading: false,
      userRecentProject: action.payload,
    }),
    getRecentProjectFailure: (state, action) => ({
      ...state,
      isRecentProjectLoading: false,
      error: action.payload,
    }),

    getReviewRequest: (state) => ({
      ...state,
      isReviewLoading: true,
      error: null,
    }),
    getReviewSuccess: (state, action) => ({
      ...state,
      isReviewLoading: false,
      userReview: action.payload,
    }),
    getReviewFailure: (state, action) => ({
      ...state,
      isReviewLoading: false,
      error: action.payload,
    }),

    clearData: (state) => ({
      ...state,
      userProfile: {},
      isLoading: false,
    }),
  },
});

export const {
  getProfileRequest,
  makeTeamMemberSuccess,
  getProfileSuccess,
  getProfileFailure,
  makeFavSuccess,
  clearData,
  removeFavSuccess,
  getRecentProjectFailure,
  getRecentProjectRequest,
  getRecentProjectSuccess,
  getReviewRequest,
  getReviewSuccess,
  getReviewFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
