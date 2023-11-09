import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneListDetails: null,
  checkoutDetails: null,
  milestoneTransactionDetails: null,
  listLoading: false,
  checkoutLoading: false,
  transactionLoading: false,
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

    milestoneTransactionRequest: (state) => ({
      ...state,
      transactionLoading: true,
      error: null,
    }),
    milestoneTransactionSuccess: (state, action) => ({
      ...state,
      milestoneTransactionDetails: action.payload,
      transactionLoading: false,
    }),
    milestoneTransactionFailure: (state, action) => ({
      ...state,
      error: action.payload,
      transactionLoading: false,
    }),

    clearPaymentListingData: (state) => ({
      ...state,
      milestoneListDetails: null,
      checkoutDetails: null,
      milestoneTransactionDetails: null,
      listLoading: false,
      checkoutLoading: false,
      transactionLoading: false,
      error: null,
    }),
    clearMilestoneTransactions: (state) => ({
      ...state,
      milestoneTransactionDetails: null,
      transactionLoading: false,
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
  clearPaymentListingData,
  milestoneTransactionFailure,
  milestoneTransactionRequest,
  milestoneTransactionSuccess,
  clearMilestoneTransactions,
} = milestonePaymentSlice.actions;
export default milestonePaymentSlice.reducer;
