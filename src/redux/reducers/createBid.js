import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkBidLoading: false,
  createBidLoading: false,
  error: null,
};

const createBid = createSlice({
  name: 'createBid',
  initialState,
  reducers: {
    checkBidRequest: (state) => ({
      ...state,
      checkBidLoading: true,
      error: null,
    }),
    checkBidSuccess: (state) => ({
      ...state,
      checkBidLoading: false,
    }),
    checkBidFailure: (state, action) => ({
      ...state,
      checkBidLoading: false,
      error: action.payload,
    }),

    createBidRequest: (state) => ({
      ...state,
      createBidLoading: true,
      error: null,
    }),
    createBidSuccess: (state) => ({
      ...state,
      createBidLoading: false,
    }),
    createBidFailure: (state, action) => ({
      ...state,
      createBidLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  checkBidRequest,
  checkBidSuccess,
  checkBidFailure,
  createBidRequest,
  createBidSuccess,
  createBidFailure,
} = createBid.actions;

export default createBid.reducer;
