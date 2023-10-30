/* eslint-disable import/no-cycle */
import errorHandler from '../../utility/errorHandler';

import { getClubsService, getClubsCardInfoService } from '../../services/clubServices';
import {
  getCardInfoReq,
  getCardInfoSuccess,
  getCardInfoErr,
  getListErr,
  getListReq,
  storeSuccessData,
} from '../reducers/clubs';

const getClubs =
  ({ filterData, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getClubsService({ filterData, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getClubCardInfo =
  ({ onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(getCardInfoReq());
    try {
      const res = await getClubsCardInfoService();
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoErr);
    }
  };

export { getClubs, getClubCardInfo };
