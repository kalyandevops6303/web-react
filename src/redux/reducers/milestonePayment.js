import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneListDetails: null,
  checkoutDetails: null,
  milestoneTransactionDetails: null,
  upcomingPaymentsData: null,
  listLoading: false,
  checkoutLoading: false,
  transactionLoading: false,
  upcomingPaymentDataLoading: false,
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

    upcomingPaymentRequest: (state) => ({
      ...state,
      upcomingPaymentDataLoading: true,
      error: null,
    }),
    upcomingPaymentSuccess: (state, action) => ({
      ...state,
      upcomingPaymentsData: action.payload,
      upcomingPaymentDataLoading: false,
    }),
    upcomingPaymentFailure: (state, action) => ({
      ...state,
      error: action.payload,
      upcomingPaymentDataLoading: false,
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
    clearUpcomingPayments: (state) => ({
      ...state,
      upcomingPaymentsData: null,
      upcomingPaymentDataLoading: false,
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
  clearUpcomingPayments,
  upcomingPaymentFailure,
  upcomingPaymentRequest,
  upcomingPaymentSuccess,
} = milestonePaymentSlice.actions;
export default milestonePaymentSlice.reducer;
