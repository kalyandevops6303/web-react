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
} from '../../services/dashboardServices'; // You need to import the relevant services
import {
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
} from '../reducers/dashboard';

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

const getTeamMembers = () => async (dispatch) => {
  dispatch(getTeamMemberRequest());
  try {
    const res = await getTeamMemberService();
    dispatch(getTeamMemberSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, getTeamMemberFailure);
  }
};

const getInvitedMember = () => async (dispatch) => {
  dispatch(getInvitedMemberRequest());
  try {
    const res = await getInvitedTeamMemberService();
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

export {
  getRecommendedProjects,
  getProfilePercentage,
  getTeamMembers,
  getInvitedMember,
  getJoinRequest,
  getRecommendedTalent,
  getRecommendedTeams,
  getTeamInvitation,
  getMyTeam,
};
