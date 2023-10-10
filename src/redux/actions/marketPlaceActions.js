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
  ({ isMyListing, isRecommanded, isMyBids, metaData, onSuccess, onError, postData, searchText, isFavorite }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    let res;
    try {
      if (isMyBids) {
        res = await getBidProjectService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      } else {
        res = await getListProjectService({
          postData: {
            ...postData,
            is_my_listings: isMyListing,
            is_recommended: isRecommanded,
            is_favourite: isFavorite,
          },
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
  ({ isRecommanded, metaData, primaryFilter, onSuccess, onError, postData, searchText, isFavorite }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (primaryFilter === 'talents') {
        res = await getTalentsService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      } else if (primaryFilter === 'clients') {
        res = await getClientsService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      } else if (primaryFilter === 'teams') {
        res = await getTeamsService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      }
      dispatch(getUsersSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const makeFav =
  ({ user_id, user_type, project_id, onSuccess, onError }) =>
  async () => {
    try {
      if (project_id) {
        await makeProjectFavService(project_id);
      } else {
        await makeFavService(user_id, user_type);
      }
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const removeFav =
  ({ user_id, project_id, team_id, onSuccess, onError }) =>
  async () => {
    try {
      let data;
      if (project_id) {
        data = { project_id };
      } else if (team_id) {
        data = { team_id };
      } else {
        data = { user_id };
      }
      await removeFavService(data);
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export { getCardInfo, getUsers, getListProjects, removeFav, makeFav };
