/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
import { logout as logoutZustand } from '@flexternships/utils/core-utils';
import errorHandler from '../../utility/errorHandler';

import {
  loginService,
  registerEmailService,
  verifyEmailService,
  verifyEmailForFlexternService,
  registerPhoneService,
  verifyPhoneService,
  forgotPasswordService,
  verifyOtpService,
  setNewPasswordService,
  setPasswordService,
  loginServiceGoogle,
  fcmSubscribeService,
  fcmUnsubscribeService,
  resetPasswordService,
  checkAdminService,
  checkRequestValidation,
  getFlexternVariablesService,
  getAppPermissionService,
} from '../../services/authServices';

import {
  setUserTypeSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerEmailRequest,
  registerEmailSuccess,
  registerEmailFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  setFlexternshipInviteType,
  verifyEmailForFlexternRequest,
  verifyEmailForFlexternSuccess,
  verifyEmailForFlexternFailure,
  verifyRequestInvitationFlexternToken,
  verifyRequestInvitationFlexternTokenSuccess,
  verifyRequestInvitationFlexternTokenFailure,
  registerPhoneRequest,
  registerPhoneSuccess,
  registerPhoneFailure,
  verifyPhoneRequest,
  verifyPhoneSuccess,
  verifyPhoneFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  setNewPasswordRequest,
  setNewPasswordSuccess,
  setNewPasswordFailure,
  setPasswordRequest,
  setPasswordSuccess,
  setPasswordFailure,
  resendFailure,
  resendRequest,
  resendSuccess,
  FCMSubscribe,
  logOut,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  userDataRequest,
  userDataFailure,
  userDataSuccess,
  switchProfileSuccess,
  getUserDataSuccess,
  cometChatLogin,
  savedUserDataSuccess,
  checkAdminRequest,
  checkAdminSuccess,
  checkAdminFailure,
  googleLoginRequest,
  getAppPermissionsSuccess,
  getAppPermissionsRequest,
  getAppPermissionsFailure,
  setTalentBooleanTrumioTalent,
  setTalentBooleansFlextern,
  setTalentBooleanIsFlextern,
  setUserLoginAttemptNo,
} from '../reducers/auth';
import { removeItem, setItem } from '../../utility/localStorageControl';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import { checkPoints, userTypes } from '../../utility/constants/Constant';
import { userDataService } from '../../services/dashboardServices';
import { getTeamById } from '../../services/teamServices';
import { clearTeams } from '../reducers/team';
import { clearNotificationsData } from '../reducers/notifications';
import { getTeams } from './teamsActions';
import { clearTeamCardData } from '../reducers/myTeams';
import { clearMarketplaceCardData } from '../reducers/marketPlace';
import { clearProjectCardData } from '../reducers/project';
import { registerClubEmailService } from '../../services/clubServices';
import getTeamId from '../../utility/commonUtils';
import { getItemFromSession, removeItemFromSession, setItemFromSession } from '../../utility/sessesionStorageControl';
import { getClubAdminAccess } from './inviteTalent';
import { isEmpty } from '../../utility/Utils';
import { setCookiesItem } from '@/utility/cookiesControl';

const fcmSubscribeNotification = (fcmToken) => async (dispatch) => {
  try {
    await fcmSubscribeService(fcmToken);
    dispatch(FCMSubscribe(fcmToken));
  } catch (error) {
    console.error(error, 'fcmError');
    errorHandler(error);
  }
};

const fcmUnsubscribeNotification = (fcmToken) => async () => {
  try {
    await fcmUnsubscribeService(fcmToken);
  } catch (error) {
    console.error(error);
  }
};

const loginUser = (username, password, onSuccess) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await loginService({ email: username, password });
    if (!isEmpty(res?.data?.data)) {
      dispatch(setUserTypeSuccess(res?.data?.data?.user_type));
      setItem('access_token_expires', res.data.data.access_token_expires);
      setCookiesItem('access_token', res.data.data.access_token, res.data.data.access_token_expires);
      setItem('refresh_token', res.data.data.refresh_token);
      setItem('refresh_token_expires', res.data.data.refresh_token_expires);
      setItem('user_id', res.data.data.user_id);
      if (res.data.data.is_delegate) {
        setItem('isDelegate', res.data.data.is_delegate);
      }
      // if (res.data.)
      window.dataLayer.push({ user_id: res.data.data.user_id });
      onSuccess(res.data.data);
      if (res.data?.data?.user_type === userTypes.talent) {
        if (res.data?.data?.is_flextern) {
          dispatch(setTalentBooleanIsFlextern(res.data?.data?.is_flextern));
        } else {
          dispatch(setTalentBooleanIsFlextern(false));
        }
        dispatch(setTalentBooleanTrumioTalent(res.data?.data?.trumio_talent));
        dispatch(setTalentBooleansFlextern(res.data?.data?.flextern));
      }
      if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
        dispatch(loginSuccess(res.data.data));
        dispatch(cometChatLogin(res.data.data.comet_chat_token));
        setItemFromSession('isUserVisited', true);
        if (res.data?.data?.is_delegate) {
          setItem('isDelegateProfileCreated', true);
        }
      } else {
        dispatch(loginSuccess(false));
      }
    }
  } catch (error) {
    if (error?.response?.data?.errorData?.errorCode === 403) {
      const noOfAttempt = error?.response?.data?.errorData?.message.match(/\d+/)[0];
      dispatch(setUserLoginAttemptNo(parseInt(noOfAttempt, 10)));
      // ShowToastMessage(ERROR,error?.response?.data?.errorData?.message.match(/'([^']+)'/)[1])
      dispatch(loginFailure());
    } else {
      errorHandler(error, loginFailure);
    }
  }
};

const getFlexternVariables = (onSuccessFlexternVariables) => async (dispatch) => {
  try {
    const res = await getFlexternVariablesService();
    if (!isEmpty(res?.data?.data)) {
      dispatch(setTalentBooleansFlextern(res?.data?.data?.flextern));
      dispatch(setTalentBooleanTrumioTalent(res?.data?.data?.trumio_talent));
      onSuccessFlexternVariables(res?.data?.data);
    }
  } catch (error) {
    errorHandler(error);
  }
};

const loginUserWithGoogle =
  ({ id_token, user_type, onError, onSuccess }) =>
  async (dispatch) => {
    dispatch(googleLoginRequest());
    let res;
    try {
      if (user_type) {
        res = await loginServiceGoogle({ id_token, user_type });
      } else {
        res = await loginServiceGoogle({ id_token });
      }

      setItem('access_token', res.data.data.access_token);
      setItem('access_token_expires', res.data.data.access_token_expires);
      setItem('refresh_token', res.data.data.refresh_token);
      setItem('refresh_token_expires', res.data.data.refresh_token_expires);
      setItem('user_id', res.data.data.user_id);
      window.dataLayer.push({ user_id: res.data.data.user_id });
      if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
        dispatch(loginSuccess(res.data.data));
        dispatch(cometChatLogin(res.data.data.comet_chat_token));
      } else {
        dispatch(loginSuccess(false));
      }
      onSuccess(res.data.data);
    } catch (error) {
      dispatch(loginFailure());
      onError(error, id_token);
    }
  };

const registerEmail =
  ({ email, userType, onSuccess }) =>
  async (dispatch) => {
    dispatch(registerEmailRequest());
    try {
      await registerEmailService(email, userType);
      dispatch(registerEmailSuccess(email));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, registerEmailFailure);
    }
  };

const verifyEmail = (data) => async (dispatch) => {
  dispatch(verifyEmailRequest());
  try {
    const res = await verifyEmailService(data);
    setCookiesItem('access_token', res.data.data.access_token, res.data.data.access_token_expires);
    setItem('access_token_expires', res.data.data.access_token_expires);
    setItem('refresh_token', res.data.data.refresh_token);
    setItem('refresh_token_expires', res.data.data.refresh_token_expires);
    dispatch(setTalentBooleanIsFlextern(false)); // making sure for normal talent onboarding or client onboarding the checkpoints are properly navigated
    dispatch(verifyEmailSuccess());
    return null;
  } catch (error) {
    dispatch(verifyEmailFailure());
    return error?.response?.data?.errorData?.message;
  }
};

const verifyEmailForFlextern =
  ({ data, onSuccess, invitation_token, errorHandlerInviteNotFound }) =>
  async (dispatch) => {
    dispatch(verifyEmailForFlexternRequest());
    try {
      const res = await verifyEmailForFlexternService(data, invitation_token);
      if (!isEmpty(res?.data?.data)) {
        setCookiesItem('access_token', res.data.data.access_token, res.data.data.access_token_expires);
        setItem('access_token_expires', res.data.data.access_token_expires);
        setItem('refresh_token', res.data.data.refresh_token);
        setItem('refresh_token_expires', res.data.data.refresh_token_expires);
        window.dataLayer.push({ user_id: res.data.data.user_id });
        dispatch(setTalentBooleanIsFlextern(true));
        dispatch(verifyEmailForFlexternSuccess());
        if (onSuccess) {
          onSuccess(res?.data?.data);
        }
      }
    } catch (error) {
      if (error?.response?.data?.errorData?.errorCode === 404 && errorHandlerInviteNotFound) {
        errorHandlerInviteNotFound();
      } else {
        errorHandler(error, verifyEmailForFlexternFailure);
      }
    }
  };
const setPassword = (Password) => async (dispatch) => {
  dispatch(setPasswordRequest());
  try {
    await setPasswordService(Password);
    dispatch(setPasswordSuccess());
  } catch (error) {
    errorHandler(error, setPasswordFailure);
  }
};

const registerPhone =
  ({ phone, country_code, selectedCountry, onSuccess }) =>
  async (dispatch) => {
    dispatch(registerPhoneRequest());
    try {
      await registerPhoneService({ phone, country_code });
      dispatch(registerPhoneSuccess({ phone, selectedCountry }));
      onSuccess();
    } catch (error) {
      errorHandler(error, registerPhoneFailure);
    }
  };

const verifyPhone = (data, onVerifyOtpSuccess) => async (dispatch) => {
  dispatch(verifyPhoneRequest());
  try {
    await verifyPhoneService(data);
    dispatch(verifyPhoneSuccess());
    if (onVerifyOtpSuccess) {
      onVerifyOtpSuccess();
    }
    return null;
  } catch (error) {
    dispatch(verifyPhoneFailure());
    return error?.response?.data?.errorData?.message;
  }
};

const forgotPassword =
  ({ email, onSuccess }) =>
  async (dispatch) => {
    dispatch(forgotPasswordRequest());
    try {
      await forgotPasswordService(email);
      dispatch(forgotPasswordSuccess(email));
      onSuccess();
    } catch (error) {
      errorHandler(error, forgotPasswordFailure);
    }
  };

const verifyOtp = (email, otp) => async (dispatch) => {
  dispatch(verifyOtpRequest());
  try {
    const res = await verifyOtpService(email, otp);
    dispatch(verifyOtpSuccess());
    setCookiesItem('access_token', res.data.data.access_token, res.data.data.access_token_expires);
  } catch (error) {
    errorHandler(error, verifyOtpFailure);
  }
};

const resendAction =
  ({ email, isEmailResend, isClubEmailResend, phone, userType, country_code, isPhoneResend, isEmailResendFP }) =>
  async (dispatch) => {
    dispatch(resendRequest());
    try {
      if (isEmailResendFP) {
        await forgotPasswordService(email);
      }
      if (isClubEmailResend) {
        await registerClubEmailService(email);
      }
      if (isEmailResend) {
        await registerEmailService(email, userType);
      }
      if (isPhoneResend) {
        await registerPhoneService({ phone, country_code });
      }
      dispatch(resendSuccess());
    } catch (error) {
      errorHandler(error, resendFailure);
    }
  };

const setNewPassword = (newPassword) => async (dispatch) => {
  dispatch(setNewPasswordRequest());
  try {
    await setNewPasswordService(newPassword);
    dispatch(setNewPasswordSuccess());
    ShowToastMessage(SUCCESS, 'Password has been updated');
  } catch (error) {
    errorHandler(error, setNewPasswordFailure);
  }
};

const logoutAction =
  ({ fcmToken, onSuccess }) =>
  async (dispatch) => {
    if (fcmToken) {
      dispatch(fcmUnsubscribeNotification(fcmToken));
    }
    // Zustand Logout
    logoutZustand();
    dispatch(logOut());
    dispatch(clearTeams());
    dispatch(clearTeamCardData());
    dispatch(clearProjectCardData());
    dispatch(clearMarketplaceCardData());
    dispatch(clearNotificationsData());
    onSuccess();
  };

const setUserType = (type) => async (dispatch) => {
  dispatch(setUserTypeSuccess(type));
};

const resetPassword = (data, onSuccess) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    await resetPasswordService(data);
    dispatch(resetPasswordSuccess());
    onSuccess();
    ShowToastMessage(SUCCESS, 'Password has been updated');
  } catch (error) {
    errorHandler(error, resetPasswordFailure);
  }
};
const switchProfile =
  ({ data, onSuccess, selected }) =>
  async (dispatch) => {
    try {
      dispatch(switchProfileSuccess(data));
      if (data?.user_type === 'TEAM' && data?.team_type === userTypes.club) {
        setItemFromSession('team_id', data?._id);
        dispatch(getClubAdminAccess());
      } else if (data?.user_type === 'TEAM') {
        setItemFromSession('team_id', data?._id);
        setItemFromSession('team_data', data);
      } else {
        removeItemFromSession('team_id');
        removeItemFromSession('team_data');
      }
      onSuccess(selected);
      // clearing my team data
      dispatch(clearTeamCardData());
      // clearing marketplace card data
      dispatch(clearMarketplaceCardData());
      // clearing project card data
      dispatch(clearProjectCardData());
      removeItem('selectedMyTeamsTab');
    } catch (err) {
      console.error(err);
    }
  };

const getUserData = () => async (dispatch) => {
  dispatch(userDataRequest());

  try {
    const isUserVisited = getItemFromSession('isUserVisited');
    const teamId = getTeamId('team_id');

    if (isUserVisited && teamId) {
      // User has visited and has a team ID
      const teamRes = await getTeamById(teamId);
      const userData = teamRes.data.data;

      if (userData) {
        dispatch(getUserDataSuccess(userData.user_type));
        if (userData?.team_type === userTypes.club) {
          dispatch(getClubAdminAccess());
        }
        dispatch(userDataSuccess(userData));
        dispatch(getTeams({ onSuccess: () => {} }));
      }

      // For getting the current user's details if we redirect directly to a team's page
      const userRes = await userDataService();
      const individualUserData = userRes.data.data;

      dispatch(savedUserDataSuccess(individualUserData));
    } else {
      // User is visiting for the first time or doesn't have a team ID
      const userRes = await userDataService();
      const userData = userRes.data.data;

      dispatch(userDataSuccess(userData));
      dispatch(getUserDataSuccess(userData.user_type));

      if (userData.user_type === userTypes.talent) {
        dispatch(getTeams({ onSuccess: () => {} }));
      }

      setItemFromSession('isUserVisited', true);
    }
  } catch (error) {
    errorHandler(error, userDataFailure);
  }
};

const checkIsAdmin = (teamId) => async (dispatch) => {
  dispatch(checkAdminRequest());
  try {
    const res = await checkAdminService(teamId);
    dispatch(checkAdminSuccess(res.data.data.data));
  } catch (error) {
    errorHandler(error, checkAdminFailure);
  }
};

const validateRequestFlexTernToken =
  ({ requestToken }) =>
  async (dispatch) => {
    dispatch(verifyRequestInvitationFlexternToken());
    try {
      const res = await checkRequestValidation(requestToken);
      dispatch(verifyRequestInvitationFlexternTokenSuccess(res.data?.data?.email_invited));
      dispatch(setFlexternshipInviteType(res.data?.data?.user_type));
    } catch (error) {
      errorHandler(error, verifyRequestInvitationFlexternTokenFailure);
    }
  };
const getAppPermissions = () => async (dispatch) => {
  dispatch(getAppPermissionsRequest());
  try {
    const res = await getAppPermissionService();

    dispatch(getAppPermissionsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, getAppPermissionsFailure);
  }
};

export {
  switchProfile,
  getUserData,
  resendAction,
  loginUserWithGoogle,
  setUserType,
  registerEmail,
  setPassword,
  verifyEmail,
  verifyEmailForFlextern,
  registerPhone,
  verifyPhone,
  forgotPassword,
  verifyOtp,
  setNewPassword,
  loginUser,
  fcmSubscribeNotification,
  fcmUnsubscribeNotification,
  logoutAction,
  resetPassword,
  checkIsAdmin,
  validateRequestFlexTernToken,
  getFlexternVariables,
  getAppPermissions,
};
