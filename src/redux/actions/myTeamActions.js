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

import {
  getCardInfoErr,
  getCardInfoReq,
  getCardInfoSuccess,
  getListErr,
  getListReq,
  storeSuccessData,
} from '../reducers/myTeams';

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
      errorHandler(error, getListErr);
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
      errorHandler(error, getListErr);
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
      errorHandler(error, getListErr);
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
      errorHandler(error, getListErr);
    }
  };

const getTalentListing =
  ({ filterData, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getTalentListingService({ filterData, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getClientListing =
  ({ filterData, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getClientListingService({ filterData, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getRecommendationListings =
  ({ filterData, metaData, onSuccess, onError }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      const res = await getRecommendationListingService({ filterData, metaData });
      dispatch(storeSuccessData(res?.data?.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
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
