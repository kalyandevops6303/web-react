import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  teamCreated: {},
  isTeamsLoading:false,
  updateTeamLoading: false,
  draftTeam: {},
  saveDraftTeamLoading: false,
  deleteDraftTeamLoading: false,
  getDraftTeamLoading: false,
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

    getDraftTeamRequest: (state) => ({
      ...state,
      getDraftTeamLoading: true,
    }),
    getDraftTeamSuccess: (state,action) => ({
      ...state,
      getDraftTeamLoading: false,
      draftTeam: action.payload,
    }),
    getDraftTeamError: (state) => ({
      ...state,
      getDraftTeamLoading: false,
    }),

    saveDraftTeamRequest: (state) => ({
      ...state,
      saveDraftTeamLoading: true,
    }),
    saveDraftTeamError: (state) => ({
      ...state,
      saveDraftTeamLoading: false,
    }),
    saveDraftTeamSuccess: (state, action) => ({
      ...state,
      saveDraftTeamLoading: false,
      draftTeam: action.payload,
    }),

    deleteDraftTeamRequest: (state) => ({
      ...state,
      deleteDraftTeamLoading: true,
    }),
    deleteDraftTeamSuccess: (state) => ({
      ...state,
      deleteDraftTeamLoading: false,
    }),
    deleteDraftTeamError: (state) => ({
      ...state,
      deleteDraftTeamLoading: false,
    }),

    checkDraftTeamRequest: (state) => ({
      ...state,
      saveDraftTeamLoading: true,
    }),
    checkDraftTeamError: (state) => ({
      ...state,
      saveDraftTeamLoading: false,
    }),
    checkDraftTeamSuccess: (state, action) => ({
      ...state,
      saveDraftTeamLoading: false,
      draftTeam: action.payload,
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
  getDraftTeamRequest,
  getDraftTeamSuccess,
  getDraftTeamError,
  saveDraftTeamRequest,
  saveDraftTeamError,
  saveDraftTeamSuccess,
  checkDraftTeamError,
  checkDraftTeamRequest,
  checkDraftTeamSuccess,
  deleteDraftTeamRequest,
  deleteDraftTeamSuccess,
  deleteDraftTeamError,
  deleteTeamRequest,
  deleteTeamSuccess,
  deleteTeamError,
  getTeamRequest,
  getTeamError,
} = teamSlice.actions;

export default teamSlice.reducer;