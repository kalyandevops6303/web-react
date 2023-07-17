import errorHandler from '../../utility/errorHandler';
import {
  getClientCardService,
  getClientsService,
  getListProjectClientService,
  getListProjectTalentService,
  getTalentCardService,
  getTalentsService,
} from '../../services/marketPlaceServices';

import {
  getCardInfoSuccess,
  getListErr,
  getListProjectsSuccess,
  getListReq,
  getUsersSuccess,
} from '../reducers/marketPlace';
import { userTypes } from '../../utility/constants/Constant';

const getCardInfo =
  ({ userType, onSuccess, onError }) =>
  async (dispatch) => {
    try {
      let res;
      if (userType === userTypes.client) {
        res = await getClientCardService();
      } else {
        res = await getTalentCardService();
      }
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getListProjects =
  ({ isMyListing, isRecommanded, metaData, userType, onSuccess, onError, postData, searchText }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (userType === userTypes.client) {
        res = await getListProjectClientService({ postData, searchText, metaData, isRecommanded, isMyListing });
      } else {
        res = await getListProjectTalentService({ postData, searchText, metaData, isRecommanded });
      }
      dispatch(getListProjectsSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getUsers =
  ({ isRecommanded, metaData, userType, onSuccess, onError, postData, searchText }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (userType === userTypes.client) {
        res = await getTalentsService({ postData, searchText, metaData, isRecommanded });
      } else {
        res = await getClientsService({ postData, searchText, metaData, isRecommanded });
      }
      dispatch(getUsersSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

export { getCardInfo, getUsers, getListProjects };
