import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDataLoading: false,
  recommendedProjects: null,
  recommendedProjectsLoading: false,
  getTeamMember: null,
  getTeamMemberLoading: false,
  getInvitedMember: null,
  getInvitedMemberLoading: false,
  joinRequestMember: null,
  joinRequestMemberLoading: false,
  recommendedTalent: null,
  recommendedTalentLoading: false,
  recommendedTeams: null,
  recommendedTeamsLoading: false,
  teamInvitation: null,
  teamInvitationLoading: false,
  getMyTeam: null,
  getMyTeamLoading: false,
  profilePercentage: null,
  profilePercentageLoading: false,
  projectInvites: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    recommendedProjectsRequest: (state) => ({
      ...state,
      recommendedProjectsLoading: true,
      error: null,
    }),
    recommendedProjectsSuccess: (state, action) => ({
      ...state,
      recommendedProjects: action.payload,
      recommendedProjectsLoading: false,
    }),
    recommendedProjectsFailure: (state, action) => ({
      ...state,
      recommendedProjectsLoading: false,
      error: action.payload,
    }),

    profilePercentageRequest: (state) => ({
      ...state,
      profilePercentageLoading: true,
      error: null,
    }),
    profilePercentageSuccess: (state, action) => ({
      ...state,
      profilePercentage: action.payload,
      profilePercentageLoading: false,
    }),
    profilePercentageFailure: (state, action) => ({
      ...state,
      profilePercentageLoading: false,
      error: action.payload,
    }),

    getTeamMemberRequest: (state) => ({
      ...state,
      getTeamMemberLoading: true,
      error: null,
    }),
    getTeamMemberSuccess: (state, action) => ({
      ...state,
      getTeamMember: action.payload,
      getTeamMemberLoading: false,
    }),
    getTeamMemberFailure: (state, action) => ({
      ...state,
      getTeamMemberLoading: false,
      error: action.payload,
    }),

    getInvitedMemberRequest: (state) => ({
      ...state,
      getInvitedMemberLoading: true,
      error: null,
    }),
    getInvitedMemberSuccess: (state, action) => ({
      ...state,
      getInvitedMember: action.payload,
      getInvitedMemberLoading: false,
    }),
    getInvitedMemberFailure: (state, action) => ({
      ...state,
      getInvitedMemberLoading: false,
      error: action.payload,
    }),

    joinRequestMemberRequest: (state) => ({
      ...state,
      joinRequestMemberLoading: true,
      error: null,
    }),
    joinRequestMemberSuccess: (state, action) => ({
      ...state,
      joinRequestMember: action.payload,
      joinRequestMemberLoading: false,
    }),
    joinRequestMemberFailure: (state, action) => ({
      ...state,
      joinRequestMemberLoading: false,
      error: action.payload,
    }),

    recommendedTalentRequest: (state) => ({
      ...state,
      recommendedTalentLoading: true,
      error: null,
    }),
    recommendedTalentSuccess: (state, action) => ({
      ...state,
      recommendedTalent: action.payload,
      recommendedTalentLoading: false,
    }),
    recommendedTalentFailure: (state, action) => ({
      ...state,
      recommendedTalentLoading: false,
      error: action.payload,
    }),

    recommendedTeamsRequest: (state) => ({
      ...state,
      recommendedTeamsLoading: true,
      error: null,
    }),
    recommendedTeamsSuccess: (state, action) => ({
      ...state,
      recommendedTeams: action.payload,
      recommendedTeamsLoading: false,
    }),
    recommendedTeamsFailure: (state, action) => ({
      ...state,
      recommendedTeamsLoading: false,
      error: action.payload,
    }),

    teamInvitationRequest: (state) => ({
      ...state,
      teamInvitationLoading: true,
      error: null,
    }),
    teamInvitationSuccess: (state, action) => ({
      ...state,
      teamInvitation: action.payload,
      teamInvitationLoading: false,
    }),
    teamInvitationFailure: (state, action) => ({
      ...state,
      teamInvitationLoading: false,
      error: action.payload,
    }),

    getMyTeamRequest: (state) => ({
      ...state,
      getMyTeamLoading: true,
      error: null,
    }),
    getMyTeamSuccess: (state, action) => ({
      ...state,
      getMyTeam: action.payload,
      getMyTeamLoading: false,
    }),
    getMyTeamFailure: (state, action) => ({
      ...state,
      getMyTeamLoading: false,
      error: action.payload,
    }),
    getProjectInvitesSuccess: (state, action) => ({
      ...state,
      projectInvites: action.payload,
    }),

    clearData: (state) => ({
      ...state,
      userData: null,
      userDataLoading: false,
      recommendedProjects: null,
      recommendedProjectsLoading: false,
      profilePercentage: null,
      profilePercentageLoading: false,
      error: null,
    }),
  },
});

export const {
  recommendedProjectsRequest,
  recommendedProjectsSuccess,
  recommendedProjectsFailure,
  profilePercentageRequest,
  profilePercentageSuccess,
  profilePercentageFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  getTeamMemberFailure,
  getInvitedMemberRequest,
  getInvitedMemberSuccess,
  getInvitedMemberFailure,
  joinRequestMemberRequest,
  joinRequestMemberSuccess,
  joinRequestMemberFailure,
  recommendedTalentRequest,
  recommendedTalentSuccess,
  recommendedTalentFailure,
  recommendedTeamsRequest,
  recommendedTeamsSuccess,
  recommendedTeamsFailure,
  teamInvitationRequest,
  teamInvitationSuccess,
  teamInvitationFailure,
  getMyTeamRequest,
  getMyTeamSuccess,
  getMyTeamFailure,
  getProjectInvitesSuccess,
  clearData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
