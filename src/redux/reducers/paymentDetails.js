import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  w9details: null,
  w8bendetails: null,
  tax_identification: null,
  loading: false,
  error: null,
};

const paymentDetailsSlice = createSlice({
  name: 'paymentData',
  initialState,
  reducers: {
    paymentDetailsRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    paymentDetailsSuccess: (state, action) => ({
      ...state,
      loading: false,
      userDetails: action.payload,
    }),
    paymentDetailsFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { paymentDetailsFailure, paymentDetailsRequest, paymentDetailsSuccess } = paymentDetailsSlice.actions;

export default paymentDetailsSlice.reducer;
