import errorHandler from '../../utility/errorHandler';
import {
  getBidProjectService,
  getCardService,
  getClientsService,
  getListProjectService,
  getTalentsService,
  getTeamsService,
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
import { makeFavService, makeProjectFavService, removeFavService } from '../../services/profileServices';

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

const getListProjects =
  ({ isMyListing, isRecommanded, isMyBids, metaData, onSuccess, onError, postData, searchText }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    let res;
    try {
      if (isMyBids) {
        res = await getBidProjectService({
          postData: { ...postData, is_recommended: isRecommanded },
          searchText,
          metaData,
        });
      } else {
        res = await getListProjectService({
          postData: { ...postData, is_my_listings: isMyListing, is_recommended: isRecommanded },
          searchText,
          metaData,
        });
      }

      dispatch(getListProjectsSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getUsers =
  ({ isRecommanded, metaData, primaryFilter, onSuccess, onError, postData, searchText }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (primaryFilter === 'talents') {
        res = await getTalentsService({
          postData: { ...postData, is_recommended: isRecommanded },
          searchText,
          metaData,
        });
      } else if (primaryFilter === 'clients') {
        res = await getClientsService({
          postData: { ...postData, is_recommended: isRecommanded },
          searchText,
          metaData,
        });
      } else if (primaryFilter === 'teams') {
        res = await getTeamsService({ postData: { ...postData, is_recommended: isRecommanded }, searchText, metaData });
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
