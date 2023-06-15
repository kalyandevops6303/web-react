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
} from '../reducers/auth';
import { setItem } from '../../utility/localStorageControl';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const loginUser = (username, password, onSuccess) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await loginService({ email: username, password });
    setItem('access_token', res.data.data.access_token);
    onSuccess(res.data.data);
    dispatch(loginSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, loginFailure);
  }
};

const loginUserWithGoogle =
  ({ id_token, user_type, onError, onSuccess }) =>
  async (dispatch) => {
    try {
      const res = await loginServiceGoogle({ id_token, user_type });
      setItem('access_token', res.data.data.access_token);
      dispatch(loginSuccess(res.data.data));
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
      await registerPhoneService(phone, country_code);
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
        await registerPhoneService(phone, country_code);
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

const setUserType = (type) => async (dispatch) => {
  dispatch(setUserTypeSuccess(type));
};

export {
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
};
