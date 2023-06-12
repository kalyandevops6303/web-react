import { getClientService, getTalentService, makeFavService, removeFavService } from '../../services/profileServices';
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
    if (user_type === 'TALENT') {
      res = await getTalentService(id);
    }
    if (user_type === 'CLIENT') {
      res = await getClientService(id);
    }
    dispatch(getProfileSuccess(res));
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
const removeFavourite = (id, user_type) => async (dispatch) => {
  try {
    await removeFavService(id, user_type);
    dispatch(removeFavSuccess(id));
  } catch (error) {
    errorHandler(error);
  }
};

export { getProfile, makeFavourite, removeFavourite };
