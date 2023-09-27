import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createReferralLoading: false,
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
  },
});

export const { createReferralRequest, createReferralSuccess, createReferralFailure } = referralAndRewardSlice.actions;

export default referralAndRewardSlice.reducer;
