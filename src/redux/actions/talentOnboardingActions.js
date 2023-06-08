import errorHandler from '../../utility/errorHandler';
import {
  accountDetailsService,
  profileDetailsService,
  userDetailsService,
} from '../../services/talentOnboardingServices';
import {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFailure,
  accountDetailsRequest,
  accountDetailsSuccess,
  accountDetailsFailure,
  profileDetailsRequest,
  profileDetailsSuccess,
  profileDetailsFailure,
} from '../reducers/talentOnboarding';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const getUserDetails = () => async (dispatch) => {
  dispatch(userDetailsRequest());
  try {
    const res = await userDetailsService();
    dispatch(userDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, userDetailsFailure);
  }
};

const saveTalentAccountDetails = (data, onSuccess) => async (dispatch) => {
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

export { getUserDetails, saveTalentAccountDetails, saveProfileDetails };
