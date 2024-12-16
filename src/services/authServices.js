import API from '../configs/api';
// eslint-disable-next-line import/no-cycle
import DataService from '../configs/dataService/dataService';

const loginService = (data) => DataService.post(API.auth.login, data);

const loginServiceGoogle = (data) => DataService.post(API.auth.socialSignUpSingIn, data);

const registerEmailService = (email, userType) =>
  DataService.post(API.auth.registerEmail, { email, user_type: userType });

const verifyEmailService = (data) => DataService.post(API.auth.verifyEmail, data);

const verifyEmailForFlexternService = (data, invitation_token) =>
  DataService.post(`${API.auth.validateFlexTernEmail}?invitation_token=${invitation_token}`, data);

const setPasswordService = (password) => DataService.post(API.auth.createNewPassowrd, { password });

const registerPhoneService = ({ phone, country_code }) =>
  DataService.post(API.auth.registerPhone, { phone, country_code });

const verifyPhoneService = (data) => DataService.post(API.auth.verifyPhone, data);

const forgotPasswordService = (email) => DataService.post(API.auth.forgotPassword, { email });

const verifyOtpService = (email, otp) => DataService.post(API.auth.verifyOtp, { email, code: otp });

const setNewPasswordService = (newPassword) => DataService.post(API.auth.setNewPassword, { new_password: newPassword });

const fcmSubscribeService = (token) => DataService.post(`${API.notifications.subscribe}`, { token });
const fcmUnsubscribeService = (token) => DataService.post(`${API.notifications.unsubscribe}`, { token });

const resetPasswordService = (data) => DataService.post(API.auth.resetPassword, data);

const checkAdminService = (teamId) => DataService.get(`${API.auth.checkAdmin}?team_id=${teamId}`);

const checkRequestValidation = (requestToken) => DataService.post(`${API.auth.requestValidation}`, requestToken);

const getFlexternVariablesService = () => DataService.get(API.auth.flexternValues);
const getAppPermissionService = () => DataService.get(`${API.permissions.appPermissions}`);

const logoutUserService = () => DataService.post(`${API.auth.logout}`);

export {
  loginService,
  loginServiceGoogle,
  registerEmailService,
  verifyEmailService,
  verifyEmailForFlexternService,
  setPasswordService,
  registerPhoneService,
  verifyPhoneService,
  forgotPasswordService,
  verifyOtpService,
  setNewPasswordService,
  fcmSubscribeService,
  fcmUnsubscribeService,
  resetPasswordService,
  checkAdminService,
  getAppPermissionService,
  checkRequestValidation,
  getFlexternVariablesService,
  logoutUserService,
};
