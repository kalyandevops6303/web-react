import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createReferralLoading: false,
  validateReferralLoading: false,
  convertReferralLoading: false,
  error: null,
};

const referralAndRewardSlice = createSlice({
  name: 'referralAndReward',
  initialState,
  reducers: {
    createReferralRequest: (state) => ({
      ...state,
      createReferralLoading: true,
      error: null,
    }),
    createReferralSuccess: (state) => ({
      ...state,
      createReferralLoading: false,
    }),
    createReferralFailure: (state, action) => ({
      ...state,
      createReferralLoading: false,
      error: action.payload,
    }),

    validateReferralRequest: (state) => ({
      ...state,
      validateReferralLoading: true,
      error: null,
    }),
    validateReferralSuccess: (state) => ({
      ...state,
      validateReferralLoading: false,
    }),
    validateReferralFailure: (state, action) => ({
      ...state,
      validateReferralLoading: false,
      error: action.payload,
    }),

    convertReferralRequest: (state) => ({
      ...state,
      convertReferralLoading: true,
      error: null,
    }),
    convertReferralSuccess: (state) => ({
      ...state,
      convertReferralLoading: false,
    }),
    convertReferralFailure: (state, action) => ({
      ...state,
      convertReferralLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  createReferralRequest,
  createReferralSuccess,
  createReferralFailure,
  validateReferralRequest,
  validateReferralSuccess,
  validateReferralFailure,
  convertReferralRequest,
  convertReferralSuccess,
  convertReferralFailure,
} = referralAndRewardSlice.actions;

export default referralAndRewardSlice.reducer;
