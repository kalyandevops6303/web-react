import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reportDetails: null,
    reportLoading: false,
    checkReportLoading: false,
    alreadyReported: false,
    checkReportError: null,
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
    checkReportRequest: (state) => ({
      ...state,
      alreadyReported: false,
      checkReportLoading: true,
      reportError: null,
    }),
    checkReportSuccess: (state, action) => ({
      ...state,
      alreadyReported: action.payload,
      checkReportLoading: false,
      reportError: null,
    }),
    checkReportFailure: (state, action) => ({
      ...state,
      checkReportLoading: false,
      reportError: action.payload,
    }),
  },
});

export const {
    reportRequest,
    reportSuccess,
    reportFailure,
    checkReportRequest,
    checkReportSuccess,
    checkReportFailure,
} = reportSlice.actions;

export default reportSlice.reducer;