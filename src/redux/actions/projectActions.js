import { getCardService, getCardServiceFlextern, getProjectsListFlexternService } from '../../services/projectServices';
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

const getCardInfoFlextern =
  ({ onSuccess, onError, userType }) =>
  async (dispatch) => {
    dispatch(getCardInfoReq());
    try {
      const res = await getCardServiceFlextern({ userType });
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoErr);
    }
  };

const getProjectsListingFlextern =
  ({ metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getProjectsListFlexternService({ metaData });
      if (res) {
        dispatch(storeSuccessData(res?.data?.data));
        onSuccess();
      } else {
        throw new Error(`Invalid project filter: ${metaData?.project_status}`);
      }
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

export { getCardInfo, getProjectsListingFlextern, getCardInfoFlextern };
