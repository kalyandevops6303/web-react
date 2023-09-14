import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giveRatingLoading: false,
  yourSubmittedRatingLoading: false,
  yourSubmittedRating: null,
  yourRatingLoading: false,
  yourRating: null,
  error: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    giveRatingRequest: (state) => ({
      ...state,
      giveRatingLoading: true,
      error: null,
    }),
    giveRatingSuccess: (state) => ({
      ...state,
      giveRatingLoading: false,
    }),
    giveRatingFailure: (state, action) => ({
      ...state,
      giveRatingLoading: false,
      error: action.payload,
    }),

    yourSubmittedRatingRequest: (state) => ({
      ...state,
      yourSubmittedRatingLoading: true,
      error: null,
    }),
    yourSubmittedRatingSuccess: (state, action) => ({
      ...state,
      yourSubmittedRatingLoading: false,
      yourSubmittedRating: action.payload,
    }),
    yourSubmittedRatingFailure: (state, action) => ({
      ...state,
      yourSubmittedRatingLoading: false,
      error: action.payload,
    }),

    yourRatingRequest: (state) => ({
      ...state,
      yourRatingLoading: true,
      error: null,
    }),
    yourRatingSuccess: (state, action) => ({
      ...state,
      yourRatingLoading: false,
      yourRating: action.payload,
    }),
    yourRatingFailure: (state, action) => ({
      ...state,
      yourRatingLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  giveRatingRequest,
  giveRatingSuccess,
  giveRatingFailure,
  yourSubmittedRatingRequest,
  yourSubmittedRatingSuccess,
  yourSubmittedRatingFailure,
  yourRatingRequest,
  yourRatingSuccess,
  yourRatingFailure,
} = ratingSlice.actions;

export default ratingSlice.reducer;
