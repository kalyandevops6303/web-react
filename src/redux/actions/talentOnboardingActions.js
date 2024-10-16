import errorHandler from '../../utility/errorHandler';
import {
  accountDetailsService,
  checkpointCompleteService,
  deleteResumeService,
  identityDeleteService,
  parsedResumeService,
  profileCompletionFlexternService,
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
  resumeParsedDetailsRequest,
  resumeParsedDetailsSuccess,
  resumeParsedDetailsFailure,
  deleteResumeRequest,
  deleteResumeSuccess,
  deleteResumeFailure,
  identityFileRequest,
  identityFileSuccess,
  identityFileFailure,
} from '../reducers/talentOnboarding';
import { cometChatLogin, profileCompletionFlexternFailure, profileCompletionFlexternRequest, profileCompletionFlexternSuccess } from '../reducers/auth';
import { scanAndProcessFiles } from '../../utility/Utils';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { setFormDocuments } from '../reducers/formData';

const getUserDetails = (onGetUserDetailsSuccess) => async (dispatch) => {
  dispatch(userDetailsRequest());
  try {
    const res = await userDetailsService();
    if(onGetUserDetailsSuccess) {
      onGetUserDetailsSuccess(res.data.data);
    }
    dispatch(userDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, userDetailsFailure);
  }
};

const getResumeParsedDetails = (setResumeParsedDetails,setParseResume, fileKey, setFiles) => async (dispatch) => {
  await dispatch(resumeParsedDetailsRequest());
  try {
    const res = await parsedResumeService(fileKey);
    let resumeDetails = res.data.data.generated_info;
    resumeDetails = { ...resumeDetails, _id: res?.data?.data?._id, file_key: res?.data?.data?.file_key };
    if (res?.data?.data) await setResumeParsedDetails(res?.data?.data?.generated_info);
    await dispatch(resumeParsedDetailsSuccess(resumeDetails));
  } catch (error) {
    setParseResume(false);
    dispatch(resumeParsedDetailsFailure());
    if (setFiles) {
      setFiles([]);
    }
    dispatch(setFormDocuments(null));
    ShowToastMessage(ERROR, 'Something went wrong. Please try again.');
  }
};

const deleteResume = (onSuccess) => async (dispatch) => {
  dispatch(deleteResumeRequest());
  try {
    await deleteResumeService();
    dispatch(deleteResumeSuccess());
    onSuccess();
  } catch (error) {
    dispatch(deleteResumeFailure());
    ShowToastMessage(ERROR, 'Something went wrong. Please try again.');
  }
};

const deleteIdentityFile = (onSuccess) => async (dispatch) => {
  dispatch(identityFileRequest());
  try {
    await identityDeleteService();
    dispatch(identityFileSuccess());
    onSuccess();
  } catch (error) {
    dispatch(identityFileFailure());
    ShowToastMessage(ERROR, 'Something went wrong. Please try again.');
  }
};

const saveTalentAccountDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(accountDetailsRequest());
  try {
    const handleSaveTalentDetails = async () => {
      const res = await accountDetailsService(data);
      dispatch(accountDetailsSuccess(res.data.data));
      dispatch(cometChatLogin(res.data.data.comet_chat_token));
      onSuccess();
    };
    if (data?.image_uri) {
      scanAndProcessFiles({
        fileData: [{ file_name: 'Profile Image', file_key: data?.image_uri }],
        handleMainAPI: handleSaveTalentDetails,
        onError: () => dispatch(accountDetailsFailure()),
        isPrivate: false,
      });
    } else {
      handleSaveTalentDetails();
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
    if (data?.resume || data?.image_uri) {
      scanAndProcessFiles({
        fileData: data?.image_uri ? [{ file_name: 'Profile Image', file_key: data?.image_uri }] : [data?.resume],
        handleMainAPI: handleSaveProfileDetails,
        onError: () => dispatch(profileDetailsFailure()),
        isPrivate: !!data?.resume,
      });
    } else {
      handleSaveProfileDetails();
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

const getProfileCompletionFlextern = () => async (dispatch) => {
  dispatch(profileCompletionFlexternRequest());
  try {
    const res = await profileCompletionFlexternService();
    dispatch(profileCompletionFlexternSuccess(res.data?.data));
  } catch (error) {
    errorHandler(error, profileCompletionFlexternFailure);
  }
}

export {
  getUserDetails,
  getResumeParsedDetails,
  saveTalentAccountDetails,
  saveProfileDetails,
  saveCheckpointComplete,
  saveSocialProfileDetails,
  deleteResume,
  deleteIdentityFile,
  getProfileCompletionFlextern
};
