import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  isLoggedIn: false,
  isCometChatLoggedIn: false,
  userData: null,
  savedUserData: null,
  userDataLoading: false,
  authData: null,
  isEmailVerified: false,
  phone: null,
  isPhoneVerified: false,
  isPasswordSet: false,
  password: null,
  loading: false,
  error: null,
  userType: null,
  fcmToken: '',
  cometChatToken: '',
  checkAdmin: null,
  checkAdminLoading: false,
  flextern : null,
  trumio_talent:null,
  is_flextern: null,
  profileCompletionFlextern: null,
  profileCompletionFlexternLoading: false,
  appPermissions: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserTypeSuccess: (state, action) => ({
      ...state,
      userType: action.payload,
    }),
    clearDataSuccess: (state) => ({
      ...state,
      email: null,
      isEmailVerified: false,
      phone: null,
      isPhoneVerified: false,
      isPasswordSet: false,
      password: null,
      loading: false,
      isResendLoading: false,
      error: null,
      fcmToken: '',
      userType: null,
      
    }),

    logOut: () => ({
      isLoggedIn: false,
      userData: null,
      authData: null,
    }),

    // resend otp
    resendRequest: (state) => ({
      ...state,
      isResendLoading: true,
      error: null,
    }),
    resendSuccess: (state) => ({
      ...state,
      isResendLoading: false,
      error: null,
    }),
    resendFailure: (state, action) => ({
      ...state,
      isResendLoading: false,
      error: action.payload,
    }),

    // Register Email
    registerEmailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    registerEmailSuccess: (state, action) => ({
      ...state,
      loading: false,
      email: action.payload,
    }),
    registerEmailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Verify Email
    verifyEmailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    verifyEmailSuccess: (state) => ({
      ...state,
      loading: false,
      isEmailVerified: true,
    }),
    verifyEmailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Verify Email for  Flextern
    verifyEmailForFlexternRequest : (state) => ({
      ...state,
      loading:true,
      error: null,
    }),

    verifyEmailForFlexternSuccess : (state) => ({
      ...state,
      loading:false,
      isEmailVerified: true,
    }),

    verifyEmailForFlexternFailure : (state,action) => ({
      ...state,
      loading:false,
      error: action.payload,
    }),
    // verify request invitation token

    verifyRequestInvitationFlexternToken: (state) => ({
      ...state,
      loading: true,
      error:null,
    }),

    verifyRequestInvitationFlexternTokenSuccess: (state,action) => ({
      ...state,
      loading: false,
      email: action.payload,
    }),

    verifyRequestInvitationFlexternTokenFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    // Register Phone
    registerPhoneRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    registerPhoneSuccess: (state, action) => ({
      ...state,
      loading: false,
      phone: action.payload,
    }),
    registerPhoneFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    
    // Set  Password
    setPasswordRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    setPasswordSuccess: (state) => ({
      ...state,
      loading: false,
      isPasswordSet: true,
    }),
    setPasswordFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Verify Phone
    verifyPhoneRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    verifyPhoneSuccess: (state) => ({
      ...state,
      loading: false,
      isPhoneVerified: true,
    }),
    verifyPhoneFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Forgot Password
    forgotPasswordRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    forgotPasswordSuccess: (state, action) => ({
      ...state,
      loading: false,
      email: action.payload,
    }),
    forgotPasswordFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Verify OTP
    verifyOtpRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    verifyOtpSuccess: (state) => ({
      ...state,
      loading: false,
      isEmailVerified: true,
    }),
    verifyOtpFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Set New Password
    setNewPasswordRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    setNewPasswordSuccess: (state) => ({
      ...state,
      loading: false,
      isPasswordSet: true,
    }),
    setNewPasswordFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // Login

    googleLoginRequest: (state) => ({
      ...state,
      googleAuthLoading: true,
      error: null,
    }),

    loginRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      loading: false,
      googleAuthLoading: false,
      isLoggedIn: action.payload !== false,
      // authData: action.payload,
    }),
    loginFailure: (state, action) => ({
      ...state,
      loading: false,
      googleAuthLoading: false,
      error: action.payload,
    }),
    setTalentBooleansFlextern: (state,action) => ({
      ...state,
      flextern: action.payload,
    }),
    setTalentBooleanTrumioTalent : (state,action) => ({
      ...state,
      trumio_talent: action.payload,
    }),
    setTalentBooleanIsFlextern : (state,action) => ({
      ...state,
      is_flextern: action.payload,
    }),

    // CometChat Login
    cometloginSuccess: (state) => ({
      ...state,
      loading: false,
      isCometChatLoggedIn: true,
    }),

    // FCM
    FCMSubscribe: (state, action) => ({
      ...state,
      fcmToken: action.payload,
    }),

    // CometChat
    cometChatLogin: (state, action) => ({
      ...state,
      cometChatToken: action.payload,
    }),

    setLoggedInStatus: (state) => ({
      ...state,
      isLoggedIn: true,
    }),

    resetPasswordRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    resetPasswordSuccess: (state) => ({
      ...state,
      loading: false,
    }),
    resetPasswordFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // app permissions
    getAppPermissionsRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),

    getAppPermissionsSuccess: (state, action) => ({
      ...state,
      loading: false,
      appPermissions: action.payload,

    }),

    getAppPermissionsFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    // userData

    userDataRequest: (state) => ({
      ...state,
      userDataLoading: true,
      error: null,
    }),
    userDataSuccess: (state, action) => ({
      ...state,
      userData: action.payload,
      savedUserData: action.payload.user_type !== 'TEAM' ? action.payload : state.savedUserData,
      isTeamLoggedIn: action.payload.user_type === 'TEAM',
      userDataLoading: false,
    }),
    savedUserDataSuccess: (state, action) => ({
      ...state,
      savedUserData: action.payload.user_type !== 'TEAM' ? action.payload : state.savedUserData,
    }),
    userDataFailure: (state, action) => ({
      ...state,
      userDataLoading: false,
      error: action.payload,
    }),

    // switch profile
    switchProfileSuccess: (state, action) => ({
      ...state,
      userData: action.payload,
      isTeamLoggedIn: action.payload.user_type === 'TEAM',
    }),

    getUserDataSuccess: (state, action) => ({
      ...state,
      userType: action.payload,
    }),

    checkAdminRequest: (state) => ({
      ...state,
      checkAdminLoading: true,
      error: null,
    }),
    checkAdminSuccess: (state, action) => ({
      ...state,
      checkAdminLoading: false,
      checkAdmin: action.payload,
    }),
    checkAdminFailure: (state, action) => ({
      ...state,
      checkAdminLoading: false,
      error: action.payload,
    }),
    profileCompletionFlexternRequest: (state) => ({
      ...state, 
      profileCompletionFlexternLoading: true, 
      error: null 
    }),
    profileCompletionFlexternSuccess: (state, action) => ({
      ...state, 
      profileCompletionFlexternLoading: false, 
      profileCompletionFlextern: action.payload,
      error: null 
    }),
    profileCompletionFlexternFailure: (state, action) => ({
      ...state, 
      profileCompletionFlextern: null, 
      profileCompletionFlexternLoading: false, 
      error: action.payload 
    })
  },
});

export const {
  switchProfileSuccess,
  clearDataSuccess,
  setUserTypeSuccess,
  registerEmailRequest,
  registerEmailSuccess,
  registerEmailFailure,
  resendRequest,
  resendSuccess,
  resendFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  verifyEmailFPRequest,
  verifyEmailFPSuccess,
  verifyEmailFPFailure,
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
  loginRequest,
  loginSuccess,
  loginFailure,
  cometloginSuccess,
  FCMSubscribe,
  cometChatLogin,
  logOut,
  setLoggedInStatus,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  userDataRequest,
  userDataSuccess,
  userDataFailure,
  getUserDataSuccess,
  savedUserDataSuccess,
  checkAdminRequest,
  checkAdminSuccess,
  checkAdminFailure,
  googleLoginRequest,
  getAppPermissionsRequest,
  getAppPermissionsSuccess,
  getAppPermissionsFailure,
  setTalentBooleanTrumioTalent,
  setTalentBooleansFlextern,
  setTalentBooleanIsFlextern,
  profileCompletionFlexternRequest, 
  profileCompletionFlexternSuccess, 
  profileCompletionFlexternFailure

} = authSlice.actions;

export default authSlice.reducer;
