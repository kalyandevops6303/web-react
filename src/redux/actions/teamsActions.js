import { getTeamService, createTeamService, getInviteDetails, updateTeamService } from '../../services/teamServices';
// eslint-disable-next-line import/no-cycle
import errorHandler from '../../utility/errorHandler';
import {
  getTeamCreated,
  getTeamError,
  getTeamRequest,
  getTeamSuccess,
  updateTeamFailure,
  updateTeamRequest,
  updateTeamSuccess,
} from '../reducers/team';
import { getInvitedBySuccess } from '../reducers/projectDetails';

const getTeams =
  ({ onSuccess }) =>
  async (dispatch) => {
    dispatch(getTeamRequest());
    try {
      const res = await getTeamService();
      dispatch(getTeamSuccess(res.data.data.data));
      onSuccess(res.data.data.data);
    } catch (error) {
      errorHandler(error, getTeamError);
    }
  };

const createTeam =
  ({ data, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const res = await createTeamService(data);
      dispatch(getTeamCreated(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const updateTeam = (data, onSuccess) => async (dispatch) => {
  dispatch(updateTeamRequest());
  try {
    const res = await updateTeamService(data);
    dispatch(updateTeamSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, updateTeamFailure);
  }
};

const getWhoInvited =
  ({ id, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const res = await getInviteDetails(id);
      dispatch(getInvitedBySuccess(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };
// eslint-disable-next-line import/prefer-default-export
export { createTeam, getTeams, getWhoInvited, updateTeam };
