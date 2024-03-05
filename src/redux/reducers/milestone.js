import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneData: null,
  loading: false,
  submissionHistory: [],
  submissionHistoryLoading: false,
  error: null,
};

const milestoneSlice = createSlice({
  name: 'milestoneData',
  initialState,
  reducers: {
    milestoneDetailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    milestoneDetailSuccess: (state, action) => ({
      ...state,
      loading: false,
      milestoneData: action.payload,
    }),
    milestoneDetailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    submissionHistoryRequest: (state) => ({
      ...state,
      submissionHistoryLoading: true,
      error: null,
    }),
    submissionHistorySuccess: (state, action) => ({
      ...state,
      submissionHistoryCurrentPreview: action.payload.data,
      submissionHistory:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.submissionHistory, ...action.payload.data],
      submissionHistoryMetadata: action.payload.metadata,
      submissionHistoryLoading: false,
    }),
    submissionHistoryFailure: (state, action) => ({
      ...state,
      submissionHistoryLoading: false,
      error: action.payload,
    }),
    clearData: (state) => ({
      ...state,
      milestoneData: null,
      loading: false,
      error: null,
    }),
    clearHistory: (state) => ({
      ...state,
      submissionHistory: [],
      submissionHistoryLoading: false,
      error: null,
      submissionHistoryCurrentPreview: null,
      submissionHistoryMetadata: null,
    }),
  },
});

export const {
  clearData,
  clearHistory,
  milestoneDetailFailure,
  milestoneDetailRequest,
  milestoneDetailSuccess,
  submissionHistoryRequest,
  submissionHistoryFailure,
  submissionHistorySuccess,
} = milestoneSlice.actions;

export default milestoneSlice.reducer;
