import errorHandler from '../../utility/errorHandler';
import {
  allReferralsFailure,
  allReferralsRequest,
  allReferralsSuccess,
  convertReferralFailure,
  convertReferralRequest,
  convertReferralSuccess,
  createReferralFailure,
  createReferralRequest,
  createReferralSuccess,
  validateReferralFailure,
  validateReferralRequest,
  validateReferralSuccess,
} from '../reducers/referralAndReward';
import {
  allReferralsService,
  convertReferralService,
  createReferralService,
  validateReferralService,
} from '../../services/referralAndRewardServices';
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

const validateReferral = (token) => async (dispatch) => {
  dispatch(validateReferralRequest());
  try {
    const res = await validateReferralService(token);
    dispatch(validateReferralSuccess(res.data.data));
    setItem('referral_data', res.data.data);
  } catch (error) {
    errorHandler(error, validateReferralFailure);
  }
};

const convertReferral = (referralId, userId, userType, onSuccess) => async (dispatch) => {
  dispatch(convertReferralRequest());
  try {
    const res = await convertReferralService(referralId, userId, userType);
    dispatch(convertReferralSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, convertReferralFailure);
  }
};

const getAllReferrals = (page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(allReferralsRequest());
  }
  try {
    const res = await allReferralsService(page, pageSize);
    dispatch(allReferralsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, allReferralsFailure);
  }
};

export { createNewReferral, validateReferral, convertReferral, getAllReferrals };
