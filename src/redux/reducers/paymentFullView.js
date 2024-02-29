import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMetrics: null,
  paymentMetricsLoading: false,
  paymentHistory: null,
  paymentHistoryLoading: false,
  error: null,
};

const paymentFullViewSlice = createSlice({
  name: 'paymentFullView',
  initialState,
  reducers: {
    paymentMetricsRequest: (state) => ({
      ...state,
      paymentMetricsLoading: true,
      error: null,
    }),
    paymentMetricsSuccess: (state, action) => ({
      ...state,
      paymentMetricsLoading: false,
      paymentMetrics: action.payload,
    }),
    paymentMetricsFailure: (state, action) => ({
      ...state,
      paymentMetricsLoading: false,
      error: action.payload,
    }),

    paymentHistoryRequest: (state) => ({
      ...state,
      paymentHistoryLoading: true,
      error: null,
    }),
    paymentHistorySuccess: (state, action) => ({
      ...state,
      paymentHistoryLoading: false,
      paymentHistory: action.payload,
    }),
    paymentHistoryFailure: (state, action) => ({
      ...state,
      paymentHistoryLoading: false,
      error: action.payload,
    }),

    clearPaymentFullViewData: () => initialState,
  },
});

export const {
  paymentMetricsRequest,
  paymentMetricsSuccess,
  paymentMetricsFailure,
  paymentHistoryRequest,
  paymentHistorySuccess,
  paymentHistoryFailure,
  clearPaymentFullViewData,
} = paymentFullViewSlice.actions;

export default paymentFullViewSlice.reducer;
