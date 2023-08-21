import { getTeamService, createTeamService } from '../../services/teamServices';
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

// eslint-disable-next-line import/prefer-default-export
export { createTeam, getTeams };
