import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  stripeData: null,
};

const stripeDetailSlice = createSlice({
  name: 'stripeData',
  initialState,
  reducers: {
    stripeDetailsRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    stripeDetailsSuccess: (state, action) => ({
      ...state,
      loading: false,
      stripeData: action.payload,
    }),
    stripeDetailsFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { stripeDetailsFailure, stripeDetailsRequest, stripeDetailsSuccess } = stripeDetailSlice.actions;

export default stripeDetailSlice.reducer;
