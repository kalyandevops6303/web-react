import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  raiseDisputeLoading: false,
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
  },
});

export const { raiseDisputeRequest, raiseDisputeSuccess, raiseDisputeFailure } = disputeSlice.actions;

export default disputeSlice.reducer;
