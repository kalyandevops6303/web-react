import { getCardService } from '../../services/myTeamServices';

import { getCardInfoSuccess } from '../reducers/myTeams';

import errorHandler from '../../utility/errorHandler';

const getCardInfo =
  ({ onSuccess, onError }) =>
  async (dispatch) => {
    try {
      const res = await getCardService();
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getTeamListing = () => {};

export { getCardInfo, getTeamListing };
