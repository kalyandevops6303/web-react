import { getTeamService, createTeamService, getInvitedByService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import { getTeamSuccess } from '../reducers/team';

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

const createTeam = (data, onSuccess, onError) => async () => {
  try {
    await createTeamService(data);
    onSuccess();
  } catch (error) {
    onError();
    errorHandler(error);
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
export { createTeam, getTeams, getWhoInvited };
