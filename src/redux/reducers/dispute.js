import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  raiseDisputeLoading: false,
  allDisputesLoading: false,
  allDisputes: null,
  acceptDisputeLoading: false,
  replyOnDisputeLoading: false,
  disputeRepliesLoading: false,
  disputeReplies: null,
  resolveDisputeLoading: false,
  disputesCount: null,
  disputesCountLoading: false,
  error: null,
};

const disputeSlice = createSlice({
  name: 'dispute',
  initialState,
  reducers: {
    raiseDisputeRequest: (state) => ({
      ...state,
      raiseDisputeLoading: true,
      error: null,
    }),
    raiseDisputeSuccess: (state) => ({
      ...state,
      raiseDisputeLoading: false,
    }),
    raiseDisputeFailure: (state, action) => ({
      ...state,
      raiseDisputeLoading: false,
      error: action.payload,
    }),

    allDisputesRequest: (state) => ({
      ...state,
      allDisputesLoading: true,
      error: null,
    }),
    allDisputesSuccess: (state, action) => ({
      ...state,
      allDisputesLoading: false,
      allDisputes: action.payload,
    }),
    allDisputesFailure: (state, action) => ({
      ...state,
      allDisputesLoading: false,
      error: action.payload,
    }),

    acceptDisputeRequest: (state) => ({
      ...state,
      acceptDisputeLoading: true,
      error: null,
    }),
    acceptDisputeSuccess: (state) => ({
      ...state,
      acceptDisputeLoading: false,
    }),
    acceptDisputeFailure: (state, action) => ({
      ...state,
      acceptDisputeLoading: false,
      error: action.payload,
    }),

    replyOnDisputeRequest: (state) => ({
      ...state,
      replyOnDisputeLoading: true,
      error: null,
    }),
    replyOnDisputeSuccess: (state) => ({
      ...state,
      replyOnDisputeLoading: false,
    }),
    replyOnDisputeFailure: (state, action) => ({
      ...state,
      replyOnDisputeLoading: false,
      error: action.payload,
    }),

    disputeRepliesRequest: (state) => ({
      ...state,
      disputeRepliesLoading: true,
      error: null,
    }),
    disputeRepliesSuccess: (state, action) => ({
      ...state,
      disputeRepliesLoading: false,
      disputeReplies: action.payload,
    }),
    disputeRepliesFailure: (state, action) => ({
      ...state,
      disputeRepliesLoading: false,
      error: action.payload,
    }),

    resolveDisputeRequest: (state) => ({
      ...state,
      resolveDisputeLoading: true,
      error: null,
    }),
    resolveDisputeSuccess: (state) => ({
      ...state,
      resolveDisputeLoading: false,
    }),
    resolveDisputeFailure: (state, action) => ({
      ...state,
      resolveDisputeLoading: false,
      error: action.payload,
    }),

    disputesCountRequest: (state) => ({
      ...state,
      disputesCountLoading: true,
      error: null,
    }),
    disputesCountSuccess: (state, action) => ({
      ...state,
      disputesCountLoading: false,
      disputesCount: action.payload,
    }),
    disputesCountFailure: (state, action) => ({
      ...state,
      disputesCountLoading: false,
      error: action.payload,
    }),

    clearDisputeReplies: (state) => ({
      ...state,
      disputeReplies: null,
    }),
  },
});

export const {
  raiseDisputeRequest,
  raiseDisputeSuccess,
  raiseDisputeFailure,
  allDisputesRequest,
  allDisputesSuccess,
  allDisputesFailure,
  acceptDisputeRequest,
  acceptDisputeSuccess,
  acceptDisputeFailure,
  replyOnDisputeRequest,
  replyOnDisputeSuccess,
  replyOnDisputeFailure,
  disputeRepliesRequest,
  disputeRepliesSuccess,
  disputeRepliesFailure,
  resolveDisputeRequest,
  resolveDisputeSuccess,
  resolveDisputeFailure,
  disputesCountRequest,
  disputesCountSuccess,
  disputesCountFailure,
  clearDisputeReplies,
} = disputeSlice.actions;

export default disputeSlice.reducer;
