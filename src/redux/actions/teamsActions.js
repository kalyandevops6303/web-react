import { getTeamService } from '../../services/teamServices';
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

// eslint-disable-next-line import/prefer-default-export
export { getTeams };
