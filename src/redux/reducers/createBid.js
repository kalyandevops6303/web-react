import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkBidLoading: false,
  createBidLoading: false,
  projectDetails: null,
  projectDetailsLoading: false,
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

    projectDetailsRequest: (state) => ({
      ...state,
      projectDetailsLoading: true,
      error: null,
    }),
    projectDetailsSuccess: (state, action) => ({
      ...state,
      projectDetailsLoading: false,
      projectDetails: action.payload,
    }),
    projectDetailsFailure: (state, action) => ({
      ...state,
      projectDetailsLoading: false,
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
  projectDetailsRequest,
  projectDetailsSuccess,
  projectDetailsFailure,
} = createBid.actions;

export default createBid.reducer;
