import errorHandler from '../../utility/errorHandler';
import {
  accountDetailsService,
  checkpointCompleteService,
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
  checkpointCompleteRequest,
  checkpointCompleteSuccess,
  checkpointCompleteFailure,
} from '../reducers/talentOnboarding';
import { cometChatLogin } from '../reducers/auth';
import { handleCorruptedFiles, handleScanFiles } from '../../utility/Utils';
import { fileScanStatus } from '../../utility/constants/Constant';

const getUserDetails = (onGetUserDetailsSuccess) => async (dispatch) => {
  dispatch(userDetailsRequest());
  try {
    const res = await userDetailsService();
    onGetUserDetailsSuccess(res.data.data);
    dispatch(userDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, userDetailsFailure);
  }
};

const saveTalentAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const callMainAPI = async () => {
      const res = await accountDetailsService(data);
      dispatch(accountDetailsSuccess(res.data.data));
      dispatch(cometChatLogin(res.data.data.comet_chat_token));
      onSuccess();
    };
    if (data?.image_uri) {
      // Recursive function until status in Scanning
      const finalScanStatus = await handleScanFiles({
        fileKeys: [{ file_name: 'Profile Image', file_key: data?.image_uri }],
        // isPrivate: true,
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
    if (data?.resume || data?.image_uri) {
      // Recursive function until status in Scanning
      const finalScanStatus = await handleScanFiles({
        fileKeys: data?.image_uri ? [{ file_name: 'Profile Image', file_key: data?.image_uri }] : [data?.resume],
        isPrivate: !!data?.resume,
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

const saveCheckpointComplete = (onSuccess) => async (dispatch) => {
  dispatch(checkpointCompleteRequest());
  try {
    const res = await checkpointCompleteService();
    dispatch(checkpointCompleteSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, checkpointCompleteFailure);
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

export {
  getUserDetails,
  saveTalentAccountDetails,
  saveProfileDetails,
  saveCheckpointComplete,
  saveSocialProfileDetails,
};
