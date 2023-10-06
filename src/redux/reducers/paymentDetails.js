import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  talentInfo: null,
  w9details: null,
  w8bendetails: null,
  client_info: {
    is_us_person: true,
  },
  talent_info: {
    tax_user_type: 'US',
    is_working_in_us: true,
  },
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
