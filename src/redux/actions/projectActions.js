import { getCardService, getProjectListingService } from '../../services/projectServices';
import { getCardInfoSuccess, getListReq, storeSuccessData } from '../reducers/project';

import errorHandler from '../../utility/errorHandler';

const getCardInfo =
  ({ onSuccess, onError, userType }) =>
  async (dispatch) => {
    try {
      const res = await getCardService({ userType });
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getProjectListing =
  ({ searchText, metaData, onSuccess, onError, primaryFilter, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getProjectListingService({ metaData, primaryFilter, searchText, userType });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export { getCardInfo, getProjectListing };
