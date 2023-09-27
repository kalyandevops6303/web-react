import errorHandler from '../../utility/errorHandler';
import {
  createReferralFailure,
  createReferralRequest,
  createReferralSuccess,
  validateReferralFailure,
  validateReferralRequest,
  validateReferralSuccess,
} from '../reducers/referralAndReward';
import { createReferralService, validateReferralService } from '../../services/referralAndRewardServices';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import { setItem } from '../../utility/localStorageControl';

const createNewReferral = (data, onSuccess) => async (dispatch) => {
  dispatch(createReferralRequest());
  try {
    const res = await createReferralService(data);
    dispatch(createReferralSuccess(res.data.data));
    onSuccess();
    ShowToastMessage(SUCCESS, res.data.data);
  } catch (error) {
    errorHandler(error, createReferralFailure);
  }
};

const validateNewReferral = (token) => async (dispatch) => {
  dispatch(validateReferralRequest());
  try {
    const res = await validateReferralService(token);
    dispatch(validateReferralSuccess(res.data.data));
    setItem('referral_data', res.data.data);
  } catch (error) {
    errorHandler(error, validateReferralFailure);
  }
};

export { createNewReferral, validateNewReferral };
