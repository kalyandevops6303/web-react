import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  resumeParsedDetails: null,
  userDetailsLoading: false,
  resumeParsedDetailsLoading: false,
  accountDetailsLoading: false,
  profileDetailsLoading: false,
  checkpointCompleteLoading: false,
  deleteResumeLoading: false,
  identityFileLoading: false,
  error: null,
};

const talentOnboardingSlice = createSlice({
  name: 'talentOnboarding',
  initialState,
  reducers: {
    userDetailsRequest: (state) => ({
      ...state,
      userDetailsLoading: true,
      error: null,
    }),
    userDetailsSuccess: (state, action) => ({
      ...state,
      userDetailsLoading: false,
      userDetails: action.payload,
    }),
    userDetailsFailure: (state, action) => ({
      ...state,
      userDetailsLoading: false,
      error: action.payload,
    }),

    resumeParsedDetailsRequest: (state) => ({
      ...state,
      resumeParsedDetailsLoading: true,
      error: null,
    }),
    resumeParsedDetailsSuccess: (state, action) => ({
      ...state,
      resumeParsedDetails: action.payload,
      resumeParsedDetailsLoading: false,
    }),
    resumeParsedDetailsFailure: (state, action) => ({
      ...state,
      error: action.payload,
      resumeParsedDetailsLoading: false,
    }),

    identityFileRequest: (state) => ({
      ...state,
      identityFileLoading: true,
      error: null,
    }),
    identityFileSuccess: (state) => ({
      ...state,
      identityFileLoading: false,
    }),
    identityFileFailure: (state, action) => ({
      ...state,
      identityFileLoading: false,
      error: action.payload,
    }),

    deleteResumeRequest: (state) => ({
      ...state,
      deleteResumeLoading: true,
      error: null,
    }),
    deleteResumeSuccess: (state) => ({
      ...state,
      deleteResumeLoading: false,
      error: null,
    }),
    deleteResumeFailure: (state, action) => ({
      ...state,
      deleteResumeLoading: false,
      error: action.payload,
    }),

    accountDetailsRequest: (state) => ({
      ...state,
      accountDetailsLoading: true,
      error: null,
    }),
    accountDetailsSuccess: (state) => ({
      ...state,
      accountDetailsLoading: false,
    }),
    accountDetailsFailure: (state, action) => ({
      ...state,
      accountDetailsLoading: false,
      error: action.payload,
    }),

    profileDetailsRequest: (state) => ({
      ...state,
      profileDetailsLoading: true,
      error: null,
    }),
    profileDetailsSuccess: (state) => ({
      ...state,
      profileDetailsLoading: false,
    }),
    profileDetailsFailure: (state, action) => ({
      ...state,
      profileDetailsLoading: false,
      error: action.payload,
    }),

    checkpointCompleteRequest: (state) => ({
      ...state,
      checkpointCompleteLoading: true,
      error: null,
    }),
    checkpointCompleteSuccess: (state) => ({
      ...state,
      checkpointCompleteLoading: false,
    }),
    checkpointCompleteFailure: (state, action) => ({
      ...state,
      checkpointCompleteLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFailure,
  resumeParsedDetailsRequest,
  resumeParsedDetailsSuccess,
  resumeParsedDetailsFailure,
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
  checkpointCompleteRequest,
  checkpointCompleteSuccess,
  checkpointCompleteFailure,
  deleteResumeRequest,
  deleteResumeSuccess,
  deleteResumeFailure,
  identityFileRequest,
  identityFileSuccess,
  identityFileFailure,
} = talentOnboardingSlice.actions;

export default talentOnboardingSlice.reducer;
