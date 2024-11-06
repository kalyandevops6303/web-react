import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showHiringTab: false,
  showHiringTabLoading: false,
  questionsLink: null,
  questionsLinkLoading: false,
  error: null,
};

const hiringSlice = createSlice({
  name: 'hiring',
  initialState,
  reducers: {
    showHiringTabRequest: (state) => ({
      ...state,
      showHiringTabLoading: true,
      error: null,
    }),
    showHiringTabSuccess: (state, action) => ({
      ...state,
      showHiringTabLoading: false,
      showHiringTab: action.payload,
      error: null,
    }),
    showHiringTabFailure: (state, action) => ({
      ...state,
      showHiringTabLoading: false,
      error: action.payload,
    }),
    questionsLinkRequest: (state) => ({
      ...state,
      questionsLinkLoading: true,
      error: null,
    }),
    questionsLinkSuccess: (state, action) => ({
      ...state,
      questionsLinkLoading: false,
      questionsLink: action.payload,
      error: null,
    }),
    questionsLinkFailure: (state, action) => ({
      ...state,
      questionsLinkLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  showHiringTabRequest,
  showHiringTabSuccess,
  showHiringTabFailure,
  questionsLinkRequest,
  questionsLinkSuccess,
  questionsLinkFailure,
} = hiringSlice.actions;

export default hiringSlice.reducer;
