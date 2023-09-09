import { getTeamService, createTeamService, getInviteDetails } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import { getInvitedBySuccess } from '../reducers/projectDetails';
import { getTeamCreated, getTeamSuccess } from '../reducers/team';

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
export { createTeam, getTeams, getWhoInvited };
