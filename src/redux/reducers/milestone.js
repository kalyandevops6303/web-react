import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneData: null,
  loading: false,
  submissionHistory: [],
  submissionHistoryLoading: false,
  submissionHistoryCurrentPreview: null,
  submissionHistoryMetadata: null,
  isMilestoneSubmitting: false,
  isMilestoneAccepting: false,
  isMilestoneMarking: false,
  error: null,
};

const milestoneSlice = createSlice({
  name: 'milestoneData',
  initialState,
  reducers: {
    submitMilestoneRequest: (state) => ({
      ...state,
      isMilestoneSubmitting: true,
      error: null,
    }),
    submitMilestoneSuccess: (state) => ({
      ...state,
      isMilestoneSubmitting: false,
    }),
    submitMilestoneFailure: (state, action) => ({
      ...state,
      isMilestoneSubmitting: false,
      error: action.payload,
    }),

    acceptMilestoneRequest: (state) => ({
      ...state,
      isMilestoneAccepting: true,
      error: null,
    }),
    acceptMilestoneSuccess: (state) => ({
      ...state,
      isMilestoneAccepting: false,
    }),
    acceptMilestoneFailure: (state, action) => ({
      ...state,
      isMilestoneAccepting: false,
      error: action.payload,
    }),

    markCompelteRequest: (state) => ({
      ...state,
      isMilestoneMarking: true,
      error: null,
    }),
    markCompelteSuccess: (state) => ({
      ...state,
      isMilestoneMarking: false,
    }),
    markCompelteFailure: (state, action) => ({
      ...state,
      isMilestoneMarking: false,
      error: action.payload,
    }),

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
  submitMilestoneFailure,
  submitMilestoneRequest,
  submitMilestoneSuccess,
  acceptMilestoneFailure,
  acceptMilestoneRequest,
  acceptMilestoneSuccess,
  markCompelteFailure,
  markCompelteRequest,
  markCompelteSuccess,
} = milestoneSlice.actions;

export default milestoneSlice.reducer;
