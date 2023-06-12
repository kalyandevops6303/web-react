import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  userDataLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    userDataRequest: (state) => ({
      ...state,
      userDataLoading: true,
      error: null,
    }),
    userDataSuccess: (state, action) => ({
      ...state,
      userData: action.payload,
      userDataLoading: false,
    }),
    userDataFailure: (state, action) => ({
      ...state,
      userDataLoading: false,
      error: action.payload,
    }),
  },
});

export const { userDataRequest, userDataSuccess, userDataFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
