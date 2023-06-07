const API = {
  auth: {
    login: '/user/sign-in',
    socialSignUpSingIn: '/user/social-auth/google',
    registerEmail: '/user/email/create-otp',
    verifyEmail: '/user/email/verify-otp',
    createNewPassowrd: '/user/password/create',
    registerPhone: '/user/phone/create-otp',
    verifyPhone: '/user/phone/verify-otp',
    forgotPassword: '/user/forgot-password/create',
    verifyOtp: '/user/forgot-password/verify',
    setNewPassword: '/user/forgot-password/change',
  },
};

export default API;
