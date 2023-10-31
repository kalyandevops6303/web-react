import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneListDetails: null,
  checkoutDetails: null,
  listLoading: false,
  checkoutLoading: false,
  error: null,
};

const milestonePaymentSlice = createSlice({
  name: 'milestonePayment',
  initialState,
  reducers: {
    milestonePaymentRequest: (state) => ({
      ...state,
      checkoutLoading: true,
      error: null,
    }),
    milestonePaymentSuccess: (state, action) => ({
      ...state,
      checkoutLoading: false,
      checkoutDetails: action.payload,
    }),
    milestonePaymentFailure: (state, action) => ({
      ...state,
      checkoutLoading: false,
      error: action.payload,
    }),
    milestoneListRequest: (state) => ({
      ...state,
      listLoading: true,
      error: null,
    }),
    milestoneListSuccess: (state, action) => ({
      ...state,
      listLoading: false,
      milestoneListDetails: action.payload,
    }),
    milestoneListFailure: (state, action) => ({
      ...state,
      listLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  milestonePaymentFailure,
  milestonePaymentRequest,
  milestonePaymentSuccess,
  milestoneListFailure,
  milestoneListRequest,
  milestoneListSuccess,
} = milestonePaymentSlice.actions;
export default milestonePaymentSlice.reducer;
