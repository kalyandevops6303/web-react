import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getSupportCountLoading: false,
  supportCount: null,
  loading: false,
  error: null,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    supportRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    supportSuccess: (state) => ({
      ...state,
      loading: false,
    }),
    supportFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    getSupportCountRequest: (state) => ({
      ...state,
      getSupportCountLoading: true,
      error: null,
    }),
    getSupportCountSuccess: (state, action) => ({
      ...state,
      getSupportCountLoading: false,
      supportCount: action.payload,
    }),
    getSupportCountFailure: (state, action) => ({
      ...state,
      getSupportCountLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  supportRequest,
  supportSuccess,
  supportFailure,
  getSupportCountRequest,
  getSupportCountSuccess,
  getSupportCountFailure,
} = supportSlice.actions;

export default supportSlice.reducer;
