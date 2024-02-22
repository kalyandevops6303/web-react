import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  milestoneData: null,
  loading: false,
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
    clearData: (state) => ({
      ...state,
      milestoneData: null,
      loading: false,
      error: null,
    }),
  },
});

export const { clearData, milestoneDetailFailure, milestoneDetailRequest, milestoneDetailSuccess } =
  milestoneSlice.actions;

export default milestoneSlice.reducer;
