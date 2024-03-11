import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDataLoading: false,
  recommendedProjects: null,
  recommendedProjectsLoading: false,
  getTeamMember: [],
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
  projectInvitation: null,
  projectInvitationLoading: false,
  getMyTeam: null,
  getMyTeamLoading: false,
  profilePercentage: null,
  profilePercentageLoading: false,
  projectInvites: [],
  activeProjectsForClient: null,
  activeProjectsForClientLoading: false,
  upcomingProjectsForClient: null,
  upcomingProjectsForClientLoading: false,
  projectsBidsForClient: null,
  projectsBidsForClientLoading: false,
  recommendedTeamsForClient: null,
  recommendedTeamsForClientLoading: false,
  checkBidsAccepted: null,
  checkBidsAcceptedLoading: false,
  activeProjectsForTalent: null,
  activeProjectsForTalentLoading: false,
  upcomingProjectsForTalent: null,
  upcomingProjectsForTalentLoading: false,
  activeProjectsForTeam: null,
  activeProjectsForTeamLoading: false,
  upcomingProjectsForTeam: null,
  upcomingProjectsForTeamLoading: false,
  totalReferralAmount: 0,
  totalReferralAmountLoading: false,
  alerts: [],
  projectModalData: null,
  projectModalDataLoading: false,
  upcomingPaymentsData: null,
  upcomingPaymentsDataLoading: false,
  downloadUrl: null,
  downloadUrlLoading: false,
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
      // getTeamMember: action.payload,
      getTeamMemberLoading: false,
      memberCurrentPreview: action.payload.data,
      getTeamMember:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.getTeamMember, ...action.payload.data],
      getMemberMetaData: action.payload.metadata,
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

      getInvitedMemberLoading: false,
      invitedMemberCurrentPreview: action.payload.data,
      getInvitedMember:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.getInvitedMember, ...action.payload.data],
      invitedMemberMetaData: action.payload.metadata,
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
    projectInvitationRequest: (state) => ({
      ...state,
      projectInvitationLoading: true,
      error: null,
    }),
    projectInvitationSuccess: (state, action) => ({
      ...state,
      projectInvitation: action.payload,
      projectInvitationLoading: false,
    }),
    projectInvitationFailure: (state, action) => ({
      ...state,
      projectInvitationLoading: false,
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

    removeMemberRequest: (state) => ({
      ...state,
      removeMemberLoading: true,
      error: null,
    }),
    removeMemberSuccess: (state) => ({
      ...state,
      removeMemberLoading: true,
      error: null,
    }),

    removeMemberFailure: (state, action) => ({
      ...state,
      removeMemberLoading: false,
      error: action.payload,
    }),
    getAlertRequest: (state) => ({
      ...state,
      getAlertLoading: true,
      error: null,
    }),
    getAlertSuccess: (state, action) => ({
      ...state,
      getAlertLoading: true,
      alerts: action.payload,
      error: null,
    }),

    getAlertFailure: (state, action) => ({
      ...state,
      getAlertLoading: false,
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

    activeProjectsForClientRequest: (state) => ({
      ...state,
      activeProjectsForClientLoading: true,
      error: null,
    }),
    activeProjectsForClientSuccess: (state, action) => ({
      ...state,
      activeProjectsForClient: action.payload,
      activeProjectsForClientLoading: false,
    }),
    activeProjectsForClientFailure: (state, action) => ({
      ...state,
      activeProjectsForClientLoading: false,
      error: action.payload,
    }),

    upcomingProjectsForClientRequest: (state) => ({
      ...state,
      upcomingProjectsForClientLoading: true,
      error: null,
    }),
    upcomingProjectsForClientSuccess: (state, action) => ({
      ...state,
      upcomingProjectsForClient: action.payload,
      upcomingProjectsForClientLoading: false,
    }),
    upcomingProjectsForClientFailure: (state, action) => ({
      ...state,
      upcomingProjectsForClientLoading: false,
      error: action.payload,
    }),

    projectsBidsForClientRequest: (state) => ({
      ...state,
      projectsBidsForClientLoading: true,
      error: null,
    }),
    projectsBidsForClientSuccess: (state, action) => ({
      ...state,
      projectsBidsForClient: action.payload,
      projectsBidsForClientLoading: false,
    }),
    projectsBidsForClientFailure: (state, action) => ({
      ...state,
      projectsBidsForClientLoading: false,
      error: action.payload,
    }),

    recommendedTeamsForClientRequest: (state) => ({
      ...state,
      recommendedTeamsForClientLoading: true,
      error: null,
    }),
    recommendedTeamsForClientSuccess: (state, action) => ({
      ...state,
      recommendedTeamsForClient: action.payload,
      recommendedTeamsForClientLoading: false,
    }),
    recommendedTeamsForClientFailure: (state, action) => ({
      ...state,
      recommendedTeamsForClientLoading: false,
      error: action.payload,
    }),

    checkBidsAcceptedRequest: (state) => ({
      ...state,
      checkBidsAcceptedLoading: true,
      error: null,
    }),
    checkBidsAcceptedSuccess: (state, action) => ({
      ...state,
      checkBidsAccepted: action.payload,
      checkBidsAcceptedLoading: false,
    }),
    checkBidsAcceptedFailure: (state, action) => ({
      ...state,
      checkBidsAcceptedLoading: false,
      error: action.payload,
    }),

    activeProjectsForTalentRequest: (state) => ({
      ...state,
      activeProjectsForTalentLoading: true,
      error: null,
    }),
    activeProjectsForTalentSuccess: (state, action) => ({
      ...state,
      activeProjectsForTalent: action.payload,
      activeProjectsForTalentLoading: false,
    }),
    activeProjectsForTalentFailure: (state, action) => ({
      ...state,
      activeProjectsForTalentLoading: false,
      error: action.payload,
    }),

    upcomingProjectsForTalentRequest: (state) => ({
      ...state,
      upcomingProjectsForTalentLoading: true,
      error: null,
    }),
    upcomingProjectsForTalentSuccess: (state, action) => ({
      ...state,
      upcomingProjectsForTalent: action.payload,
      upcomingProjectsForTalentLoading: false,
    }),
    upcomingProjectsForTalentFailure: (state, action) => ({
      ...state,
      upcomingProjectsForTalentLoading: false,
      error: action.payload,
    }),

    activeProjectsForTeamRequest: (state) => ({
      ...state,
      activeProjectsForTeamLoading: true,
      error: null,
    }),
    activeProjectsForTeamSuccess: (state, action) => ({
      ...state,
      activeProjectsForTeam: action.payload,
      activeProjectsForTeamLoading: false,
    }),
    activeProjectsForTeamFailure: (state, action) => ({
      ...state,
      activeProjectsForTeamLoading: false,
      error: action.payload,
    }),

    upcomingProjectsForTeamRequest: (state) => ({
      ...state,
      upcomingProjectsForTeamLoading: true,
      error: null,
    }),
    upcomingProjectsForTeamSuccess: (state, action) => ({
      ...state,
      upcomingProjectsForTeam: action.payload,
      upcomingProjectsForTeamLoading: false,
    }),
    upcomingProjectsForTeamFailure: (state, action) => ({
      ...state,
      upcomingProjectsForTeamLoading: false,
      error: action.payload,
    }),

    totalReferralAmountRequest: (state) => ({
      ...state,
      totalReferralAmountLoading: true,
      error: null,
    }),
    totalReferralAmountSuccess: (state, action) => ({
      ...state,
      totalReferralAmount: action.payload,
      totalReferralAmountLoading: false,
    }),
    totalReferralAmountFailure: (state, action) => ({
      ...state,
      totalReferralAmountLoading: false,
      error: action.payload,
    }),
    projectModalDataRequest: (state, action) => ({
      ...state,
      projectModalDataLoading: true,
      projectModalId: action.payload,
      error: null,
    }),
    projectModalDataFailure: (state, action) => ({
      ...state,
      projectModalDataLoading: false,
      error: action.payload,
      projectModalData: null,
      projectModalId: null,
    }),
    projectModalDataSucess: (state, action) => ({
      ...state,
      projectModalDataLoading: false,
      projectModalData: action.payload,
      projectModalId: null,
    }),

    upcomingPaymentRequest: (state) => ({
      ...state,
      upcomingPaymentDataLoading: true,
      error: null,
    }),
    upcomingPaymentSuccess: (state, action) => ({
      ...state,
      upcomingPaymentsData: action.payload,
      upcomingPaymentDataLoading: false,
    }),
    upcomingPaymentFailure: (state, action) => ({
      ...state,
      error: action.payload,
      upcomingPaymentDataLoading: false,
    }),

    downloadUrlRequest: (state) => ({
      ...state,
      downloadUrlLoading: true,
      error: null,
    }),
    downloadUrlSuccess: (state, action) => ({
      ...state,
      downloadUrl: action.payload,
      downloadUrlLoading: false,
    }),
    downloadUrlFailure: (state, action) => ({
      ...state,
      error: action.payload,
      downloadUrlLoading: false,
    }),

    updateCardStatusRequest: (state) => ({
      ...state,
      updateCardStatusLoading: true,
      error: null,
    }),
    updateCardStatusSuccess: (state, action) => {
      const { type } = action.payload;
      // Find the card with the specified ID in the list
      if (action.payload.id) {
        const updatedCards = state[type].data.map((card) => {
          if (card._id === action.payload.id) {
            return {
              ...card,
              is_read: true, // Assuming you have an 'isRead' property
            };
          }
          return card;
        });

        return {
          ...state,
          [type]: {
            ...state[type],
            data: updatedCards,
            unreadCount: state[type].unreadCount - 1,
          },
          error: null,
        };
      }
      return {
        ...state,
        error: null,
      };
    },
  },
  updateCardStatusFailure: (state, action) => ({
    ...state,
    updateCardStatusLoading: false,
    error: action.payload,
  }),
});

export const {
  updateCardStatusRequest,
  updateCardStatusSuccess,
  updateCardStatusFailure,
  getAlertRequest,
  getAlertSuccess,
  getAlertFailure,
  recommendedProjectsRequest,
  recommendedProjectsSuccess,
  recommendedProjectsFailure,
  removeMemberRequest,
  removeMemberSuccess,
  removeMemberFailure,
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
  activeProjectsForClientRequest,
  activeProjectsForClientSuccess,
  activeProjectsForClientFailure,
  upcomingProjectsForClientRequest,
  upcomingProjectsForClientSuccess,
  upcomingProjectsForClientFailure,
  projectsBidsForClientRequest,
  projectsBidsForClientSuccess,
  projectsBidsForClientFailure,
  recommendedTeamsForClientRequest,
  recommendedTeamsForClientSuccess,
  recommendedTeamsForClientFailure,
  checkBidsAcceptedRequest,
  checkBidsAcceptedSuccess,
  checkBidsAcceptedFailure,
  activeProjectsForTalentRequest,
  activeProjectsForTalentSuccess,
  activeProjectsForTalentFailure,
  upcomingProjectsForTalentRequest,
  upcomingProjectsForTalentSuccess,
  upcomingProjectsForTalentFailure,
  activeProjectsForTeamRequest,
  activeProjectsForTeamSuccess,
  activeProjectsForTeamFailure,
  upcomingProjectsForTeamRequest,
  upcomingProjectsForTeamSuccess,
  upcomingProjectsForTeamFailure,
  projectModalDataRequest,
  projectModalDataFailure,
  projectModalDataSucess,
  totalReferralAmountRequest,
  totalReferralAmountSuccess,
  totalReferralAmountFailure,
  upcomingPaymentRequest,
  upcomingPaymentSuccess,
  upcomingPaymentFailure,
  projectInvitationRequest,
  projectInvitationSuccess,
  projectInvitationFailure,
  downloadUrlRequest,
  downloadUrlSuccess,
  downloadUrlFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
