import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountDetailsLoading: false,
  profileDetailsLoading: false,
  error: null,
};

const clientOnboardingSlice = createSlice({
  name: 'clientOnboarding',
  initialState,
  reducers: {
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
  },
});

export const {
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
} = clientOnboardingSlice.actions;

export default clientOnboardingSlice.reducer;
