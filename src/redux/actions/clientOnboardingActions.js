import errorHandler from '../../utility/errorHandler';
import {
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
} from '../reducers/clientOnboarding';
import { accountDetailsService, profileDetailsService } from '../../services/clientOnboardingServices';
import { saveCheckpointComplete } from './talentOnboardingActions';

const saveClientAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const res = await accountDetailsService(data);
    dispatch(accountDetailsSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, accountDetailsFailure);
  }
};

const saveProfileDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(profileDetailsRequest());
  try {
    const res = await profileDetailsService(data);
    dispatch(profileDetailsSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, profileDetailsFailure);
  }
};

const saveSocialProfileDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(profileDetailsRequest());
  try {
    const res = await profileDetailsService(data);
    dispatch(profileDetailsSuccess(res.data.data));
    dispatch(saveCheckpointComplete(onSuccess));
  } catch (error) {
    errorHandler(error, profileDetailsFailure);
  }
};

export { saveClientAccountDetails, saveProfileDetails, saveSocialProfileDetails };
