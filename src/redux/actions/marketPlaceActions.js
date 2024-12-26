import errorHandler from '../../utility/errorHandler';
import {
  getCardService,
  getCardServiceFlextern,
  getClientsService,
  getListProjectService,
  getListProjectServiceFlextern,
  getMyBidProjectService,
  getReceivedBidProjectService,
  getTalentsService,
  getTalentsServiceFlextern,
  getTeamsService,
} from '../../services/marketPlaceServices';

import {
  getCardInfoError,
  getCardInfoRequest,
  getCardInfoSuccess,
  getListErr,
  getListProjectsSuccess,
  getListReq,
  getUsersSuccess,
} from '../reducers/marketPlace';
import {
  makeFavService,
  makeProjectFavService,
  makeProjectFavServiceFlextern,
  removeFavService,
} from '../../services/profileServices';
import { userTypes } from '../../utility/constants/Constant';
import { favUnfavError, favUnfavRequest, favUnfavSuccess } from '../reducers/favUnfav';

const getCardInfo =
  ({ onSuccess, onError, flexTern }) =>
  async (dispatch) => {
    dispatch(getCardInfoRequest());
    try {
      const res = flexTern ? await getCardServiceFlextern() : await getCardService();
      dispatch(getCardInfoSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getCardInfoError);
    }
  };

const getListProjects =
  ({
    isMyListing,
    isRecommanded,
    isMyBids,
    metaData,
    onSuccess,
    onError,
    postData,
    userType,
    searchText,
    isFavorite,
    show_expired,
    show_to_be_listed,
    flexTern,
  }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    let res;
    const isReceivedBid = isMyBids && userType === userTypes.client;
    try {
      if (isReceivedBid) {
        res = await getReceivedBidProjectService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      } else if (isMyBids) {
        res = await getMyBidProjectService({
          postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
          searchText,
          metaData,
        });
      } else if (flexTern) {
          res = await getListProjectServiceFlextern({
            postData: {
              ...postData,
              is_my_listings: isMyListing,
              is_recommended: isRecommanded,
              is_favourite: isFavorite,
              show_expired,
              show_to_be_listed,
            },
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
              show_expired,
              show_to_be_listed,
            },
            searchText,
            metaData,
          });
        }
      await dispatch(getListProjectsSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getListErr);
    }
  };

const getUsers =
  ({ isRecommanded, metaData, primaryFilter, onSuccess, onError, postData, searchText, isFavorite, flexTern }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(getListReq());
    }
    try {
      let res;
      if (primaryFilter === 'talents') {
        res = flexTern
          ? await getTalentsServiceFlextern({
              postData: { ...postData, is_recommended: isRecommanded, is_favourite: isFavorite },
              searchText,
              metaData,
            })
          : await getTalentsService({
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
  ({ user_id, user_type, project_id, onSuccess, onError, flexTern }) =>
  async (dispatch) => {
    dispatch(favUnfavRequest());

    try {
      if (project_id) {
        flexTern ? await makeProjectFavServiceFlextern(project_id) : await makeProjectFavService(project_id);
      } else {
        await makeFavService(user_id, user_type);
      }
      if (onSuccess) {
        onSuccess();
      }
      dispatch(favUnfavSuccess());
    } catch (error) {
      if (onError) {
        onError();
      }
      errorHandler(error, favUnfavError);
    }
  };

const removeFav =
  ({ user_id, project_id, team_id, onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(favUnfavRequest());
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
      dispatch(favUnfavSuccess());
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError();
      }
      errorHandler(error, favUnfavError);
    }
  };

export { getCardInfo, getUsers, getListProjects, removeFav, makeFav };
