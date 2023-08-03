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
  makeFavFromMarketplaceSuccess,
  removeFavFromMarketplaceSuccess,
} from '../reducers/marketPlace';
import { userTypes } from '../../utility/constants/Constant';
import { makeFavService, makeProjectFavService, removeFavService } from '../../services/profileServices';

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

const makeFavFromMarketplace =
  ({ user_id, user_type, project_id }) =>
  async (dispatch) => {
    try {
      if (project_id) {
        await makeProjectFavService(project_id);
      } else {
        await makeFavService(user_id, user_type);
      }
      dispatch(makeFavFromMarketplaceSuccess({ user_id, user_type, _id: project_id }));
    } catch (error) {
      errorHandler(error);
    }
  };
const removeFavFromMarketplace =
  ({ user_id, project_id }) =>
  async (dispatch) => {
    try {
      const data = project_id ? { project_id } : { user_id };
      await removeFavService(data);
      dispatch(removeFavFromMarketplaceSuccess({ _id: project_id, user_id }));
    } catch (error) {
      errorHandler(error);
    }
  };

export { getCardInfo, getUsers, getListProjects, makeFavFromMarketplace, removeFavFromMarketplace };
