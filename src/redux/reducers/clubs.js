import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  isEmailVerified: false,
  clubCreateData: null,
  clubCreated: {},
  clubs: [],
  loading: false,
  error: null,
};

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    // Register Email
    registerClubEmailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    registerClubEmailSuccess: (state, action) => ({
      ...state,
      loading: false,
      email: action.payload,
    }),
    registerClubEmailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Verify Email
    verifyEmailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    verifyEmailSuccess: (state) => ({
      ...state,
      loading: false,
      isEmailVerified: true,
    }),
    verifyEmailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    getClubCreated: (state, action) => ({
      ...state,
      teamCreated: action.payload,
    }),
    setClubCreateData: (state, action) => ({
      ...state,
      clubCreateData: { ...state.clubCreateData, ...action.payload },
    }),
  },
});

export const {
  registerClubEmailRequest,
  registerClubEmailSuccess,
  registerClubEmailFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  getClubCreated,
  setClubCreateData,
} = clubSlice.actions;

export default clubSlice.reducer;
