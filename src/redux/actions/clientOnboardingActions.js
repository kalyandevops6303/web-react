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
import { handleCorruptedFiles, handleScanFiles } from '../../utility/Utils';
import { fileScanStatus } from '../../utility/constants/Constant';

const saveClientAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const callMainAPI = async () => {
      const res = await accountDetailsService(data);
      dispatch(accountDetailsSuccess(res.data.data));
      dispatch(cometChatLogin(res.data.data.comet_chat_token));
      onSuccess();
    };
    if (data?.image_uri) {
      const finalScanStatus = await handleScanFiles({
        fileKeys: [{ file_name: 'Profile Image', file_key: data?.image_uri }],
        isPrivate: false,
      });

      if (finalScanStatus.data.data.every((result) => result.status === fileScanStatus.CLEAN)) {
        callMainAPI();
      } else {
        // If files are Corrupted show toast message
        handleCorruptedFiles({ finalScanStatus });
        dispatch(accountDetailsFailure());
      }
    } else {
      callMainAPI();
    }
  } catch (error) {
    errorHandler(error, accountDetailsFailure);
  }
};

const saveProfileDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(profileDetailsRequest());
  try {
    const callMainAPI = async () => {
      const res = await profileDetailsService(data);
      dispatch(profileDetailsSuccess(res.data.data));
      onSuccess();
    };
    if (data?.image_uri || data?.company_logo) {
      const finalScanStatus = await handleScanFiles({
        fileKeys: [{ file_name: 'Company logo', file_key: data?.image_uri || data?.company_logo }],
        isPrivate: false,
      });

      if (finalScanStatus.data.data.every((result) => result.status === fileScanStatus.CLEAN)) {
        callMainAPI();
      } else {
        // If files are Corrupted show toast message
        handleCorruptedFiles({ finalScanStatus });
        dispatch(profileDetailsFailure());
      }
    } else {
      callMainAPI();
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
