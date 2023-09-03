import {
  getCardService,
  getFavoriteService,
  getInvitationsService,
  getJoinReqService,
  getTeamsService,
} from '../../services/myTeamServices';

import { getCardInfoSuccess, getListReq, storeSuccessData } from '../reducers/myTeams';

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

const getTeamListing =
  ({ searchText, metaData, onSuccess, onError, filterData, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      getListReq();
    }

    try {
      const res = await getTeamsService({ searchText, metaData, filterData, userType });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getInvitationListing =
  ({ metaData, onSuccess, onError, filterData, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      getListReq();
    }

    try {
      const res = await getInvitationsService({ metaData, filterData, userType });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getReqListing =
  ({ searchText, metaData, onSuccess, onError, filterData, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      getListReq();
    }
    try {
      const res = await getJoinReqService({ searchText, metaData, filterData, userType });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getFavListing =
  ({ searchText, metaData, onSuccess, onError, filterData, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      getListReq();
    }
    try {
      const res = await getFavoriteService({ searchText, metaData, filterData, userType });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export { getCardInfo, getTeamListing, getFavListing, getInvitationListing, getReqListing };
