import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  userDetailsLoading: false,
  accountDetailsLoading: false,
  profileDetailsLoading: false,
  checkpointCompleteLoading: false,
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
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
  checkpointCompleteRequest,
  checkpointCompleteSuccess,
  checkpointCompleteFailure,
} = talentOnboardingSlice.actions;

export default talentOnboardingSlice.reducer;
