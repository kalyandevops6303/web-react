import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supportList: [],
  supportListLoading: false,
  deleteRequestLoading: false,
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
    supportListRequest: (state) => ({
      ...state, 
      supportListLoading: false,
      error: null
    }),
    supportListSuccess: (state, action) => ({
      ...state, 
      supportList: action.payload.data,
      supportListLoading: false,
      error: null
    }),
    supportListFailure: (state, action) => ({
      ...state, 
      supportListLoading: false, 
      error: action.payload
    }),
    deleteRequestRequest: (state) => ({
      ...state, 
      deleteRequestLoading: true, 
      error: null 
    }),
    deleteRequestSuccess: (state) => ({
      ...state, 
      deleteRequestLoading: false, 
      error: null 
    }),
    deleteRequestFailure: (state, action) => ({
      ...state, 
      deleteRequestLoading: false, 
      error: action.payload
    })
  },
});

export const {
  supportRequest,
  supportSuccess,
  supportFailure,
  supportListRequest, 
  supportListSuccess, 
  supportListFailure,
  getSupportCountRequest,
  getSupportCountSuccess,
  getSupportCountFailure,
  deleteRequestRequest, 
  deleteRequestSuccess, 
  deleteRequestFailure
} = supportSlice.actions;

export default supportSlice.reducer;
