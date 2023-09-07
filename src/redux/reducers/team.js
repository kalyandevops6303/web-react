import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  teamCreated: {},
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getTeamSuccess: (state, action) => ({
      ...state,
      teams: action.payload,
    }),
    getTeamCreated: (state, action) => ({
      ...state,
      teamCreated: action.payload,
    }),

    clearTeams: () => ({
      teams: [],
      teamCreated: {},
    }),
  },
});

export const { getTeamSuccess, clearTeams, getTeamCreated } = teamSlice.actions;

export default teamSlice.reducer;
