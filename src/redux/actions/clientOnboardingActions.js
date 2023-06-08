import errorHandler from '../../utility/errorHandler';
import {
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
} from '../reducers/clientOnboarding';
import ShowToastMessage from '../../@core/components/toast';
import { accountDetailsService, profileDetailsService } from '../../services/clientOnboardingServices';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const saveClientAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const res = await accountDetailsService(data);
    dispatch(accountDetailsSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
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
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, profileDetailsFailure);
  }
};

export { saveClientAccountDetails, saveProfileDetails };
