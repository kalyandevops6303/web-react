import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {},
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    getProfileSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      userProfile: action.payload,
    }),
    getProfileFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    makeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: true },
    }),
    removeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: false },
    }),

    clearData: (state) => ({
      ...state,
      userProfile: {},
      isLoading: false,
    }),
  },
});

export const { getProfileRequest, getProfileSuccess, getProfileFailure, makeFavSuccess, clearData, removeFavSuccess } =
  profileSlice.actions;

export default profileSlice.reducer;
