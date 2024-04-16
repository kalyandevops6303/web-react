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
import { cometChatLogin } from '../reducers/auth';
import { scanAndProcessFiles } from '../../utility/Utils';

const saveClientAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const handleSaveClientDetails = async () => {
      const res = await accountDetailsService(data);
      dispatch(accountDetailsSuccess(res.data.data));
      dispatch(cometChatLogin(res.data.data.comet_chat_token));
      onSuccess();
    };
    if (data?.image_uri) {
      scanAndProcessFiles({
        fileData: [{ file_name: 'Profile Image', file_key: data?.image_uri }],
        handleMainAPI: handleSaveClientDetails,
        onError: () => dispatch(accountDetailsFailure()),
        isPrivate: false,
      });
    } else {
      handleSaveClientDetails();
    }
  } catch (error) {
    errorHandler(error, accountDetailsFailure);
  }
};

const saveProfileDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(profileDetailsRequest());
  try {
    const handleSaveProfileDetails = async () => {
      const res = await profileDetailsService(data);
      dispatch(profileDetailsSuccess(res.data.data));
      onSuccess();
    };
    if (data?.image_uri || data?.company_logo) {
      scanAndProcessFiles({
        fileData: [{ file_name: 'Company logo', file_key: data?.image_uri || data?.company_logo }],
        handleMainAPI: handleSaveProfileDetails,
        onError: () => dispatch(profileDetailsFailure()),
        isPrivate: false,
      });
    } else {
      handleSaveProfileDetails();
    }
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
