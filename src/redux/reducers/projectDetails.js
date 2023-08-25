import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectDetails: null,
  projectDetailsLoading: false,
  error: null,
};

const projectDetails = createSlice({
  name: 'projectDetails',
  initialState,
  reducers: {
    projectDetailsRequest: (state) => ({
      ...state,
      projectDetailsLoading: true,
      error: null,
    }),
    projectDetailsSuccess: (state, action) => ({
      ...state,
      projectDetailsLoading: false,
      projectDetails: action.payload,
    }),
    projectDetailsFailure: (state, action) => ({
      ...state,
      projectDetailsLoading: false,
      error: action.payload,
    }),
  },
});

export const { projectDetailsRequest, projectDetailsSuccess, projectDetailsFailure } = projectDetails.actions;

export default projectDetails.reducer;
