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
  getRequestStatusFailure,
  getRequestStatusRequest,
  getRequestStatusSuccess,
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
  getRequestStatusService,
  getTeamMeberforInviteService,
  inviteRequestService,
} from '../../services/inviteTeamMemberService';
import {
  almaMaterTalentsProjectService,
  bestTalentsForProjectService,
  favoriteTalentsForProjectService,
} from '../../services/projectDetailsServices';

const getBestTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(bestTalentsRequest());
  }
  try {
    let res;
    if (projectId) {
      res = await bestTalentsForProjectService(projectId, searchText, page, pageSize);
    } else {
      res = await bestTalentsService(searchText, page, pageSize);
    }
    dispatch(bestTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const getFavoriteTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(favoriteTalentsRequest());
  }
  try {
    let res;
    if (projectId) {
      res = await favoriteTalentsForProjectService(projectId, searchText, page, pageSize);
    } else {
      res = await favoriteTalentsService(searchText, page, pageSize);
    }
    dispatch(favoriteTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, favoriteTalentsFailure);
  }
};

const getAlmaMaterTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(almaMaterTalentsRequest());
  }
  try {
    let res;
    if (projectId) {
      res = await almaMaterTalentsProjectService(projectId, searchText, page, pageSize);
    } else {
      res = await almaMaterTalentsService(searchText, page, pageSize);
    }

    dispatch(almaMaterTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, almaMaterTalentsFailure);
  }
};

const inviteTalentsToProject =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(inviteTalentsRequest());
    try {
      const res = await inviteRequestService(data);
      dispatch(inviteTalentsSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      errorHandler(error, inviteTalentsFailure);
    }
  };

const inviteTalents =
  ({ data, onSuccess, isJoinRequest, onError }) =>
  async (dispatch) => {
    dispatch(inviteTalentsRequest());
    try {
      const res = await inviteRequestService(data);
      dispatch(inviteTalentsSuccess(res.data.data));
      ShowToastMessage(SUCCESS, isJoinRequest ? 'Join request sent' : 'Invited successfully');
      onSuccess();
    } catch (error) {
      if (onError) {
        onError();
      }
      console.error(error);
      errorHandler(error, inviteTalentsFailure);
    }
  };
const getTeamMemberForInvite = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(teamMemberForInviteRequest());
  }

  try {
    const res = await getTeamMeberforInviteService(searchText, page, pageSize, projectId);
    dispatch(teamMemberForInviteSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, teamMemberForInviteFailure);
  }
};

const getRequestStatus =
  ({ entity_type, entity_id }) =>
  async (dispatch) => {
    dispatch(getRequestStatusRequest());
    try {
      const res = await getRequestStatusService({ entity_type, entity_id });

      dispatch(getRequestStatusSuccess(Object.keys(res.data.data).length === 0 ? null : res.data.data));
    } catch (error) {
      errorHandler(error, getRequestStatusFailure);
    }
  };

export {
  getRequestStatus,
  getBestTalents,
  getTeamMemberForInvite,
  getFavoriteTalents,
  getAlmaMaterTalents,
  inviteTalents,
  inviteTalentsToProject,
};
