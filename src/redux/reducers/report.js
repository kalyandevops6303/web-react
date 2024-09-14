import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reportDetails: null,
    reportLoading: false,
    reportError: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reportRequest: (state) => ({
      ...state,
      reportLoading: true,
      reportError: null,
    }),
    reportSuccess: (state, action) => ({
      ...state,
      reportLoading: false,
      reportDetails: action.payload,
    }),
    reportFailure: (state, action) => ({
      ...state,
      reportLoading: false,
      reportError: action.payload,
    }),
  },
});

export const {
    reportRequest,
    reportSuccess,
    reportFailure,
} = reportSlice.actions;

export default reportSlice.reducer;