import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  raiseDisputeLoading: false,
  allDisputesLoading: false,
  allDisputes: null,
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
  },
});

export const {
  raiseDisputeRequest,
  raiseDisputeSuccess,
  raiseDisputeFailure,
  allDisputesRequest,
  allDisputesSuccess,
  allDisputesFailure,
} = disputeSlice.actions;

export default disputeSlice.reducer;
