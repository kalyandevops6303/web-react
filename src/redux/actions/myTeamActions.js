import {
  getCardService,
  getClientListingService,
  getFavoriteService,
  getInvitationsService,
  getJoinReqService,
  getRecommendationListingService,
  getTalentListingService,
  getTeamsService,
} from '../../services/myTeamServices';

import { getCardInfoSuccess, getListReq, storeSuccessData } from '../reducers/myTeams';

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

const getTeamListing =
  ({ searchText, metaData, onSuccess, onError, filterData, userType }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
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
      dispatch(getListReq());
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
      dispatch(getListReq());
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
      dispatch(getListReq());
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

const getTalentListing =
  ({ metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getTalentListingService();
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getClientListing =
  ({ metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getClientListingService();
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getRecommendationListings =
  ({ metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getRecommendationListingService();
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export {
  getCardInfo,
  getTeamListing,
  getFavListing,
  getInvitationListing,
  getReqListing,
  getRecommendationListings,
  getTalentListing,
  getClientListing,
};
