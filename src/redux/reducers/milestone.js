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
  milestoneDisputeLoading: false,
  milestoneDispute: [],
  milestoneDisputeCurrentPreview: null,
  milestoneDisputeMetadata: null,
  isMilestoneDisputeLoading: false,
  error: null,
  draftMilestonesData: null,
  draftMilestoneLoading: false,
  isDeleteDraftMilestoneLoading: false,
  draftArtifactsLoading: false,
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
    draftMilestoneRequest: (state) => ({
      ...state,
      draftMilestoneLoading: true,
      error: null,
    }),

    draftMilestoneSuccess: (state, action) => ({
      ...state,
      draftMilestonesData: action.payload,
      draftMilestoneLoading: false,
    }),

    draftMilestoneFailure: (state, action) => ({
      ...state,
      draftMilestonesData: null,
      draftMilestoneLoading: false,
      error: action.payload,
    }),

    getDraftArtifactsRequest: (state) => ({
      ...state,
      draftArtifactsLoading: true,
      error: null,
    }),

    getDraftArtifactsSuccess: (state, action) => ({
      ...state,
      draftArtifactsLoading: false,
      draftMilestonesData: action.payload,
      error: null,
    }),
    getDraftArtifactsFailure: (state) => ({
      ...state,
      draftArtifactsLoading: false,
      error: null,
    }),

    deleteDraftMilestoneRequest: (state) => ({
      ...state,
      isDeleteDraftMilestoneLoading: true,
      error: null,
    }),

    deleteDraftMilestoneSuccess: (state) => ({
      ...state,
      isDeleteDraftMilestoneLoading: false,
      error: null,
    }),

    deleteDraftMilestoneFailure: (state) => ({
      ...state,
      isDeleteDraftMilestoneLoading: false,
      error: null,
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

    milestoneDisputeRequest: (state) => ({
      ...state,
      isMilestoneDisputeLoading: true,
      error: null,
    }),
    milestoneDisputeSuccess: (state, action) => ({
      ...state,
      milestoneDisputeCurrentPreview: action.payload.data,
      milestoneDispute:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.milestoneDispute, ...action.payload.data],
      milestoneDisputeMetadata: action.payload.metadata,
      isMilestoneDisputeLoading: false,
    }),
    milestoneDisputeFailure: (state, action) => ({
      ...state,
      isMilestoneDisputeLoading: false,
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
    clearDispute: (state) => ({
      ...state,
      milestoneDispute: [],
      isMilestoneDisputeLoading: false,
      error: null,
      milestoneDisputeCurrentPreview: null,
      milestoneDisputeMetadata: null,
    }),
  },
});

export const {
  clearData,
  clearHistory,
  clearDispute,
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
  milestoneDisputeFailure,
  milestoneDisputeRequest,
  milestoneDisputeSuccess,
  draftMilestoneRequest,
  draftMilestoneSuccess,
  draftMilestoneFailure,
  deleteDraftMilestoneRequest,
  deleteDraftMilestoneSuccess,
  deleteDraftMilestoneFailure,
  getDraftArtifactsRequest,
  getDraftArtifactsSuccess,
  getDraftArtifactsFailure,
} = milestoneSlice.actions;

export default milestoneSlice.reducer;
