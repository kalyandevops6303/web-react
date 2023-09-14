import { getCardService, getProjectListingService } from '../../services/projectServices';
import { getCardInfoSuccess, storeSuccessData } from '../reducers/project';

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

const getProjectListing =
  ({ searchText, metaData, onSuccess, onError, primaryFilter, team_id, isTeam }) =>
  async (dispatch) => {
    try {
      const res = await getProjectListingService({ metaData, primaryFilter, team_id, isTeam, searchText });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export { getCardInfo, getProjectListing };
