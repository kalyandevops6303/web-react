import { getTeamService, createTeamService, getInvitedByService, updateTeamService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import {
  getTeamCreated,
  getTeamSuccess,
  updateTeamFailure,
  updateTeamRequest,
  updateTeamSuccess,
} from '../reducers/team';

const getTeams =
  ({ onSuccess }) =>
  async (dispatch) => {
    try {
      const res = await getTeamService();
      dispatch(getTeamSuccess(res.data.data.data));
      onSuccess();
    } catch (error) {
      errorHandler(error);
    }
  };

const createTeam = (data, onSuccess, onError) => async (dispatch) => {
  try {
    const res = await createTeamService(data);

    dispatch(getTeamCreated(res.data.data));
    onSuccess();
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
  async () => {
    try {
      const res = await getInvitedByService({ invitation_id: id });
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };
// eslint-disable-next-line import/prefer-default-export
export { createTeam, getTeams, getWhoInvited, updateTeam };
