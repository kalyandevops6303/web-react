import errorHandler from '../../utility/errorHandler';
import {
  recommendedProjectsService,
  profilePercentageService,
  getTeamMemberService,
  getMyTeamService,
  getInvitedTeamMemberService,
  getJoinRequestService,
  getRecommendedTalentService,
  getRecommendedTeamService,
  getTeamInvitationService,
  getProjectInviteService,
  removeMemberService,
  teamProfilePercentageService,
  alertService,
  activeProjectsForClientService,
  upcomingProjectsForClientService,
  projectsBidsForClientService,
  recommendedTeamsForClientService,
  checkBidsAcceptedService,
  activeProjectsForTalentService,
  upcomingProjectsForTalentService,
  activeProjectsForTeamService,
  upcomingProjectsForTeamService,
  recommendedProjectsTeamService,
  getModalDataService,
  totalReferralAmountService,
  updateCardStatusService,
  getProjectInvitationService,
  downloadUrlService,
} from '../../services/dashboardServices'; // You need to import the relevant services

import {
  getProjectInvitesSuccess,
  profilePercentageFailure,
  profilePercentageRequest,
  profilePercentageSuccess,
  recommendedProjectsFailure,
  recommendedProjectsRequest,
  recommendedProjectsSuccess,
  getTeamMemberFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  getInvitedMemberFailure,
  getInvitedMemberRequest,
  getInvitedMemberSuccess,
  joinRequestMemberFailure,
  joinRequestMemberRequest,
  joinRequestMemberSuccess,
  recommendedTalentFailure,
  recommendedTalentRequest,
  recommendedTalentSuccess,
  recommendedTeamsFailure,
  recommendedTeamsRequest,
  recommendedTeamsSuccess,
  teamInvitationFailure,
  teamInvitationRequest,
  teamInvitationSuccess,
  getMyTeamFailure,
  getMyTeamRequest,
  getMyTeamSuccess,
  removeMemberRequest,
  removeMemberFailure,
  removeMemberSuccess,
  getAlertRequest,
  getAlertSuccess,
  getAlertFailure,
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
  projectModalDataSucess,
  projectModalDataFailure,
  totalReferralAmountRequest,
  totalReferralAmountSuccess,
  totalReferralAmountFailure,
  updateCardStatusRequest,
  updateCardStatusSuccess,
  updateCardStatusFailure,
  upcomingPaymentFailure,
  upcomingPaymentRequest,
  upcomingPaymentSuccess,
  projectInvitationRequest,
  projectInvitationSuccess,
  projectInvitationFailure,
  downloadUrlSuccess,
  downloadUrlFailure,
  downloadUrlRequest,
} from '../reducers/dashboard';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR, SUCCESS } from '../../utility/constants/ToastTypes';
import { updateInvitationService, validateUrlService } from '../../services/inviteTeamMemberService';
import { userTypes } from '../../utility/constants/Constant';
import { upcomingPaymentsService } from '../../services/paymentDetailService';

const getRecommendedProjects =
  ({ user_type }) =>
  async (dispatch) => {
    dispatch(recommendedProjectsRequest());
    try {
      let res;
      if (user_type === userTypes.talent) {
        res = await recommendedProjectsService();
      }
      if (user_type === userTypes.team) {
        res = await recommendedProjectsTeamService();
      }
      if (user_type === userTypes.club) {
        res = await recommendedProjectsTeamService();
      }
      dispatch(
        recommendedProjectsSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
      );
    } catch (error) {
      errorHandler(error, recommendedProjectsFailure);
    }
  };

const getProfilePercentage = () => async (dispatch) => {
  dispatch(profilePercentageRequest());
  try {
    const res = await profilePercentageService();
    dispatch(profilePercentageSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, profilePercentageFailure);
  }
};

const getTeamMembers =
  ({ metadata, onFailure }) =>
  async (dispatch) => {
    dispatch(getTeamMemberRequest());
    try {
      const res = await getTeamMemberService({ metadata });
      dispatch(getTeamMemberSuccess(res.data.data));
    } catch (error) {
      onFailure(error.response.data);
      errorHandler(error, getTeamMemberFailure);
    }
  };

const getInvitedMember =
  ({ metadata }) =>
  async (dispatch) => {
    dispatch(getInvitedMemberRequest());
    try {
      const res = await getInvitedTeamMemberService({ metadata });
      dispatch(getInvitedMemberSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getInvitedMemberFailure);
    }
  };

const getJoinRequest = (id) => async (dispatch) => {
  dispatch(joinRequestMemberRequest());
  try {
    const res = await getJoinRequestService({ talent_id: id });
    dispatch(
      joinRequestMemberSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, joinRequestMemberFailure);
  }
};

const getRecommendedTalent = (id) => async (dispatch) => {
  dispatch(recommendedTalentRequest());
  try {
    const res = await getRecommendedTalentService({ talent_id: id });
    dispatch(recommendedTalentSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, recommendedTalentFailure);
  }
};

const removeTeamMember =
  ({ postData: data, onSuccess, isSelfRemove }) =>
  async (dispatch) => {
    dispatch(removeMemberRequest());
    try {
      const metadata = { page: 1, page_size: 10 };
      await removeMemberService(data);
      dispatch(removeMemberSuccess(data));
      if (!isSelfRemove) {
        dispatch(getTeamMembers({ metadata }));
      }
      onSuccess();
      ShowToastMessage(SUCCESS, 'Member Removed');
    } catch (error) {
      errorHandler(error, removeMemberFailure);
    }
  };

const getRecommendedTeams = () => async (dispatch) => {
  dispatch(recommendedTeamsRequest());
  try {
    const res = await getRecommendedTeamService();
    dispatch(recommendedTeamsSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }));
  } catch (error) {
    errorHandler(error, recommendedTeamsFailure);
  }
};

const getTeamInvitation = () => async (dispatch) => {
  dispatch(teamInvitationRequest());
  try {
    const res = await getTeamInvitationService();
    dispatch(teamInvitationSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }));
  } catch (error) {
    errorHandler(error, teamInvitationFailure);
  }
};
const getProjectInvitation = () => async (dispatch) => {
  dispatch(projectInvitationRequest());
  try {
    const res = await getProjectInvitationService();
    dispatch(
      projectInvitationSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, projectInvitationFailure);
  }
};

const getMyTeam = () => async (dispatch) => {
  dispatch(getMyTeamRequest());
  try {
    const res = await getMyTeamService();
    dispatch(getMyTeamSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }));
  } catch (error) {
    errorHandler(error, getMyTeamFailure);
  }
};

const getProjectInvites = () => async (dispatch) => {
  try {
    const res = await getProjectInviteService();
    dispatch(getProjectInvitesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error);
  }
};
const validateUrl =
  ({ data, onSuccess, onError }) =>
  async () => {
    try {
      const res = await validateUrlService({ token: data });
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      ShowToastMessage(ERROR, 'Invalid request');
    }
  };

const updateInvitation =
  ({ data, onSuccess, onError }) =>
  async () => {
    try {
      await updateInvitationService(data);
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getTeamProfilePercentage = () => async (dispatch) => {
  dispatch(profilePercentageRequest());
  try {
    const res = await teamProfilePercentageService();
    dispatch(profilePercentageSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, profilePercentageFailure);
  }
};

const getAlerts = () => async (dispatch) => {
  dispatch(getAlertRequest());
  try {
    const res = await alertService();
    dispatch(getAlertSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, getAlertFailure);
  }
};

const getActiveProjectsForClient = () => async (dispatch) => {
  dispatch(activeProjectsForClientRequest());
  try {
    const res = await activeProjectsForClientService();
    dispatch(
      activeProjectsForClientSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, activeProjectsForClientFailure);
  }
};

const getUpcomingProjectsForClient = () => async (dispatch) => {
  dispatch(upcomingProjectsForClientRequest());
  try {
    const res = await upcomingProjectsForClientService();
    dispatch(
      upcomingProjectsForClientSuccess({
        ...res.data.data,
        unreadCount: res.data.data.data?.[0]?.is_overall_read || 0,
      }),
    );
  } catch (error) {
    errorHandler(error, upcomingProjectsForClientFailure);
  }
};

const getProjectsBidsForClient = () => async (dispatch) => {
  dispatch(projectsBidsForClientRequest());
  try {
    const res = await projectsBidsForClientService();
    const unReadExpiredBidsCount = res.data.data.data?.filter((bid) => bid.is_expired === false);
    dispatch(
      projectsBidsForClientSuccess({
        ...res.data.data,
        unreadCount: res.data.data.data?.[0]?.is_overall_read || 0,
        unReadExpiredBidsCount,
      }),
    );
  } catch (error) {
    errorHandler(error, projectsBidsForClientFailure);
  }
};

const getRecommendedTeamsForClient = () => async (dispatch) => {
  dispatch(recommendedTeamsForClientRequest());
  try {
    const res = await recommendedTeamsForClientService();
    dispatch(
      recommendedTeamsForClientSuccess({
        ...res.data.data,
        unreadCount: res.data.data.data?.[0]?.is_overall_read || 0,
      }),
    );
  } catch (error) {
    errorHandler(error, recommendedTeamsForClientFailure);
  }
};

const getCheckBidsAccepted = () => async (dispatch) => {
  dispatch(checkBidsAcceptedRequest());
  try {
    const res = await checkBidsAcceptedService();
    dispatch(checkBidsAcceptedSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, checkBidsAcceptedFailure);
  }
};

const getActiveProjectsForTalent = () => async (dispatch) => {
  dispatch(activeProjectsForTalentRequest());
  try {
    const res = await activeProjectsForTalentService();
    dispatch(
      activeProjectsForTalentSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, activeProjectsForTalentFailure);
  }
};

const getUpcomingProjectsForTalent = () => async (dispatch) => {
  dispatch(upcomingProjectsForTalentRequest());
  try {
    const res = await upcomingProjectsForTalentService();
    dispatch(
      upcomingProjectsForTalentSuccess({
        ...res.data.data,
        unreadCount: res.data.data.data?.[0]?.is_overall_read || 0,
      }),
    );
  } catch (error) {
    errorHandler(error, upcomingProjectsForTalentFailure);
  }
};

const getActiveProjectsForTeam = () => async (dispatch) => {
  dispatch(activeProjectsForTeamRequest());
  try {
    const res = await activeProjectsForTeamService();
    dispatch(
      activeProjectsForTeamSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, activeProjectsForTeamFailure);
  }
};

const getUpcomingProjectsForTeam = () => async (dispatch) => {
  dispatch(upcomingProjectsForTeamRequest());
  try {
    const res = await upcomingProjectsForTeamService();
    dispatch(
      upcomingProjectsForTeamSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }),
    );
  } catch (error) {
    errorHandler(error, upcomingProjectsForTeamFailure);
  }
};

const getModalData =
  ({ project_id, onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(projectModalDataRequest(project_id));
    try {
      const res = await getModalDataService({ project_id });
      dispatch(projectModalDataSucess(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error, projectModalDataFailure);
    }
  };
const getTotalReferralAmount = () => async (dispatch) => {
  dispatch(totalReferralAmountRequest());
  try {
    const res = await totalReferralAmountService();
    dispatch(totalReferralAmountSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, totalReferralAmountFailure);
  }
};

const updateCardStatus =
  ({ switch_team_id, data, id, type, onSuccess }) =>
  async (dispatch) => {
    dispatch(updateCardStatusRequest());
    try {
      await updateCardStatusService({ data, switch_team_id });
      dispatch(updateCardStatusSuccess({ type, id }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, updateCardStatusFailure);
    }
  };

const getDashboardUpcomingPayments = () => async (dispatch) => {
  dispatch(upcomingPaymentRequest());
  try {
    const res = await upcomingPaymentsService();
    dispatch(upcomingPaymentSuccess({ ...res.data.data, unreadCount: res.data.data.data?.[0]?.is_overall_read || 0 }));
  } catch (error) {
    errorHandler(error, upcomingPaymentFailure);
  }
};

const getDownloadUrl =
  ({ fileKey, fileName, onSuccess }) =>
  async (dispatch) => {
    dispatch(downloadUrlRequest());
    try {
      const res = await downloadUrlService(fileKey);
      dispatch(downloadUrlSuccess(res.data.data));
      onSuccess({ download_url: res.data.data, file_name: fileName });
    } catch (error) {
      errorHandler(error, downloadUrlFailure);
    }
  };

export {
  getModalData,
  getAlerts,
  validateUrl,
  removeTeamMember,
  updateInvitation,
  getRecommendedProjects,
  getProfilePercentage,
  getTeamMembers,
  getInvitedMember,
  getJoinRequest,
  getRecommendedTalent,
  getRecommendedTeams,
  getTeamInvitation,
  getMyTeam,
  getProjectInvites,
  getTeamProfilePercentage,
  getActiveProjectsForClient,
  getUpcomingProjectsForClient,
  getProjectsBidsForClient,
  getRecommendedTeamsForClient,
  getCheckBidsAccepted,
  getActiveProjectsForTalent,
  getUpcomingProjectsForTalent,
  getActiveProjectsForTeam,
  getUpcomingProjectsForTeam,
  getTotalReferralAmount,
  updateCardStatus,
  getDashboardUpcomingPayments,
  getProjectInvitation,
  getDownloadUrl,
};
