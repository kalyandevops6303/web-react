import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getTeamSuccess: (state, action) => ({
      ...state,
      teams: action.payload,
    }),
  },
});

export const { getTeamSuccess } = teamSlice.actions;

export default teamSlice.reducer;
