import errorHandler from '../../utility/errorHandler';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import {
  almaMaterTalentsFailure,
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  bestTalentsFailure,
  bestTalentsRequest,
  bestTalentsSuccess,
  favoriteTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  inviteTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  teamMemberForInviteFailure,
  teamMemberForInviteRequest,
  teamMemberForInviteSuccess,
} from '../reducers/inviteTalent';
import {
  almaMaterTalentsService,
  bestTalentsService,
  favoriteTalentsService,
  getTeamMeberforInviteService,
  inviteRequestService,
} from '../../services/inviteTeamMemberService';

const getBestTalents = (searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(bestTalentsRequest());
  try {
    const res = await bestTalentsService(searchText, page, pageSize);
    dispatch(bestTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const getFavoriteTalents = (searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(favoriteTalentsRequest());
  try {
    const res = await favoriteTalentsService(searchText, page, pageSize);
    dispatch(favoriteTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, favoriteTalentsFailure);
  }
};

const getAlmaMaterTalents = (searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(almaMaterTalentsRequest());
  try {
    const res = await almaMaterTalentsService(searchText, page, pageSize);
    dispatch(almaMaterTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, almaMaterTalentsFailure);
  }
};

const inviteTalents =
  ({ data, onSuccess, isJoinRequest }) =>
  async (dispatch) => {
    dispatch(inviteTalentsRequest());
    try {
      const res = await inviteRequestService(data);
      dispatch(inviteTalentsSuccess(res.data.data));
      ShowToastMessage(SUCCESS, isJoinRequest ? 'Join request sent' : 'Invited successfully');
      onSuccess();
    } catch (error) {
      console.error(error);
      errorHandler(error, inviteTalentsFailure);
    }
  };
const getTeamMemberForInvite = (searchText, page, pageSize, oldData, projectId) => async (dispatch) => {
  dispatch(teamMemberForInviteRequest());
  try {
    const res = await getTeamMeberforInviteService(searchText, page, pageSize, projectId);
    dispatch(teamMemberForInviteSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, teamMemberForInviteFailure);
  }
};

export { getBestTalents, getTeamMemberForInvite, getFavoriteTalents, getAlmaMaterTalents, inviteTalents };
