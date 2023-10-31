import { getCardService, getProjectListingService } from '../../services/projectServices';
import {
  getCardInfoErr,
  getCardInfoReq,
  getCardInfoSuccess,
  getListErr,
  getListReq,
  storeSuccessData,
} from '../reducers/project';

import errorHandler from '../../utility/errorHandler';

const getCardInfo =
  ({ onSuccess, onError, userType }) =>
  async (dispatch) => {
    dispatch(getCardInfoReq());
    try {
      const res = await getCardService({ userType });
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoErr);
    }
  };

const getProjectListing =
  ({ data, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getProjectListingService({ data, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

export { getCardInfo, getProjectListing };
