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
import { scanAndProcessFiles } from '../../utility/Utils';

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
      scanAndProcessFiles({
        fileData: [{ file_name: 'Profile Image', file_key: data?.image_uri }],
        handleMainAPI: callMainAPI,
        onError: () => dispatch(accountDetailsFailure()),
        isPrivate: false,
      });
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
      scanAndProcessFiles({
        fileData: data?.image_uri ? [{ file_name: 'Profile Image', file_key: data?.image_uri }] : [data?.resume],
        handleMainAPI: callMainAPI,
        onError: () => dispatch(profileDetailsFailure()),
        isPrivate: !!data?.resume,
      });
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
