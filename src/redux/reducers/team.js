import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  teamCreated: {},
  updateTeamLoading: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getTeamRequest: (state) => ({
      ...state,
      isTeamsLoading: true,
    }),
    getTeamError: (state) => ({
      ...state,
      isTeamsLoading: false,
    }),
    getTeamSuccess: (state, action) => ({
      ...state,
      teams: action.payload,
      isTeamsLoading: false,
    }),
    getTeamCreated: (state, action) => ({
      ...state,
      teamCreated: action.payload,
    }),

    clearTeams: () => ({
      teams: [],
      teamCreated: {},
    }),

    updateTeamRequest: (state) => ({
      ...state,
      updateTeamLoading: true,
      error: null,
    }),
    updateTeamSuccess: (state) => ({
      ...state,
      updateTeamLoading: false,
    }),
    updateTeamFailure: (state, action) => ({
      ...state,
      updateTeamLoading: false,
      error: action.payload,
    }),

    removeTeamFromList: (state, action) => ({
      ...state,
      teams: state.teams.filter((team) => team._id !== action.payload),
    }),
  },
});

export const {
  removeTeamFromList,
  getTeamSuccess,
  clearTeams,
  getTeamCreated,
  updateTeamRequest,
  updateTeamSuccess,
  updateTeamFailure,
  getTeamRequest,
  getTeamError,
} = teamSlice.actions;

export default teamSlice.reducer;
