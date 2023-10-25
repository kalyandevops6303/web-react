import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneDetails: null,
  loading: false,
  error: null,
};

const milestonePaymentSlice = createSlice({
  name: 'milestonePayment',
  initialState,
  reducers: {
    milestonePaymentRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    milestonePaymentSuccess: (state, action) => ({
      ...state,
      loading: false,
      milestoneDetails: action.payload,
    }),
    milestonePaymentFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { milestonePaymentFailure, milestonePaymentRequest, milestonePaymentSuccess } =
  milestonePaymentSlice.actions;
export default milestonePaymentSlice.reducer;
