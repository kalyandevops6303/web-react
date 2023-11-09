/* eslint-disable import/no-cycle */
import errorHandler from '../../utility/errorHandler';

import {
  loginService,
  registerEmailService,
  verifyEmailService,
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
} from '../reducers/auth';
import { getItem, removeItem, setItem } from '../../utility/localStorageControl';
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
    setItem('access_token', res.data.data.access_token);
    onSuccess(res.data.data);
    if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
      dispatch(loginSuccess(res.data.data));
      dispatch(cometChatLogin(res.data.data.comet_chat_token));
      setItem('isUserVisited', true);
    } else {
      dispatch(loginSuccess(false));
    }
  } catch (error) {
    errorHandler(error, loginFailure);
  }
};

const loginUserWithGoogle =
  ({ id_token, user_type, onError, onSuccess }) =>
  async (dispatch) => {
    let res;
    try {
      if (user_type) {
        res = await loginServiceGoogle({ id_token, user_type });
      } else {
        res = await loginServiceGoogle({ id_token });
      }

      setItem('access_token', res.data.data.access_token);
      if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
        dispatch(loginSuccess(res.data.data));
        dispatch(cometChatLogin(res.data.data.comet_chat_token));
      } else {
        dispatch(loginSuccess(false));
      }
      onSuccess(res.data.data);
    } catch (error) {
      onError(error);
      errorHandler(error, loginFailure);
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
    setItem('access_token', res.data.data.access_token);
    dispatch(verifyEmailSuccess());
  } catch (error) {
    errorHandler(error, verifyEmailFailure);
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

const verifyPhone = (data) => async (dispatch) => {
  dispatch(verifyPhoneRequest());
  try {
    await verifyPhoneService(data);
    dispatch(verifyPhoneSuccess());
  } catch (error) {
    errorHandler(error, verifyPhoneFailure);
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
    setItem('access_token', res.data.data.token);
  } catch (error) {
    errorHandler(error, verifyOtpFailure);
  }
};

const resendAction =
  ({ email, isEmailResend, phone, userType, country_code, isPhoneResend, isEmailResendFP }) =>
  async (dispatch) => {
    dispatch(resendRequest());
    try {
      if (isEmailResendFP) {
        await forgotPasswordService(email);
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

const getUserData = () => async (dispatch) => {
  // const state = getState();
  // console.log(state.auth.userData?.user_type, 'userData');
  dispatch(userDataRequest());
  try {
    const team_id = getItem('team_id');
    let res;
    if (team_id) {
      res = await getTeamById(team_id);
      if (team_id) {
        dispatch(getUserDataSuccess(res.data.data?.user_type));
        dispatch(userDataSuccess(res.data.data));
      }
    } else {
      res = await userDataService();
      setItem('savedUserData', res.data.data);
      dispatch(userDataSuccess(res.data.data));
      dispatch(getUserDataSuccess(res.data.data?.user_type));
    }
    if (res.data.data?.user_type === userTypes.talent || res.data.data?.user_type === userTypes.team) {
      dispatch(getTeams({ onSuccess: () => {} }));
    }
    setItem('userData', res.data.data);
  } catch (error) {
    errorHandler(error, userDataFailure);
  }
};

const switchProfile =
  ({ data, onSuccess, selected }) =>
  async (dispatch) => {
    try {
      dispatch(switchProfileSuccess(data));
      if (data?.user_type === 'TEAM') {
        setItem('team_id', data?._id);
      } else {
        removeItem('team_id');
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

export {
  switchProfile,
  getUserData,
  resendAction,
  loginUserWithGoogle,
  setUserType,
  registerEmail,
  setPassword,
  verifyEmail,
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
};
