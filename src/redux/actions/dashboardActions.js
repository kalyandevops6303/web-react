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
  validateUrlService,
  updateInvitationService,
  removeMemberService,
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
} from '../reducers/dashboard';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR, SUCCESS } from '../../utility/constants/ToastTypes';

const getRecommendedProjects = () => async (dispatch) => {
  dispatch(recommendedProjectsRequest());
  try {
    const res = await recommendedProjectsService();
    dispatch(recommendedProjectsSuccess(res.data.data));
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
  ({ metadata }) =>
  async (dispatch) => {
    dispatch(getTeamMemberRequest());
    try {
      const res = await getTeamMemberService({ metadata });
      dispatch(getTeamMemberSuccess(res.data.data));
    } catch (error) {
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
    dispatch(joinRequestMemberSuccess(res.data.data));
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

const removeTeamMember = (data) => async (dispatch) => {
  dispatch(removeMemberRequest());
  try {
    const metadata = { page: 1, page_size: 10 };
    await removeMemberService(data);
    dispatch(removeMemberSuccess(data));
    dispatch(getTeamMembers({ metadata }));
    ShowToastMessage(SUCCESS, 'Member Removed');
  } catch (error) {
    errorHandler(error, removeMemberFailure);
  }
};

const getRecommendedTeams = () => async (dispatch) => {
  dispatch(recommendedTeamsRequest());
  try {
    const res = await getRecommendedTeamService();
    dispatch(recommendedTeamsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, recommendedTeamsFailure);
  }
};

const getTeamInvitation = () => async (dispatch) => {
  dispatch(teamInvitationRequest());
  try {
    const res = await getTeamInvitationService();
    dispatch(teamInvitationSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, teamInvitationFailure);
  }
};

const getMyTeam = () => async (dispatch) => {
  dispatch(getMyTeamRequest());
  try {
    const res = await getMyTeamService();
    dispatch(getMyTeamSuccess(res.data.data));
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
      await validateUrlService({ token: data });
      onSuccess();
    } catch (error) {
      onError();
      ShowToastMessage(ERROR, 'Invalid Invite Link');
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
      ShowToastMessage(ERROR, 'Invalid Invite Link');
      // errorHandler(error, getMyTeamFailure);
    }
  };

export {
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
};
