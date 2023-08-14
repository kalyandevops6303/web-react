import { getClientService, getTalentService, makeFavService, removeFavService } from '../../services/profileServices';
import { userTypes } from '../../utility/constants/Constant';
import errorHandler from '../../utility/errorHandler';
import {
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  makeFavSuccess,
  removeFavSuccess,
} from '../reducers/profile';

const getProfile = (id, user_type) => async (dispatch) => {
  dispatch(getProfileRequest());
  let res;
  try {
    if (user_type === userTypes.talent) {
      res = await getTalentService(id);
    }
    if (user_type === userTypes.client) {
      res = await getClientService(id);
    }
    dispatch(getProfileSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, getProfileFailure);
  }
};
// eslint-disable-next-line import/prefer-default-export

const makeFavourite = (id, user_type) => async (dispatch) => {
  try {
    await makeFavService(id, user_type);
    dispatch(makeFavSuccess(id));
  } catch (error) {
    errorHandler(error);
  }
};
const removeFavourite = (id) => async (dispatch) => {
  try {
    await removeFavService({ user_id: id });
    dispatch(removeFavSuccess(id));
  } catch (error) {
    errorHandler(error);
  }
};

export { getProfile, makeFavourite, removeFavourite };
