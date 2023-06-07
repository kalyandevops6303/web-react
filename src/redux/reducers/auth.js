import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  isLoggedIn: false,
  userData: null,
  isEmailVerified: false,
  phone: null,
  isPhoneVerified: false,
  isPasswordSet: false,
  password: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserTypeSuccess: (state, action) => ({
      ...state,
      userType: action.payload,
    }),
    clearDataSuccess: () => ({
      email: null,
      isLoggedIn: false,
      userData: null,
      isEmailVerified: false,
      phone: null,
      isPhoneVerified: false,
      isPasswordSet: false,
      password: null,
      loading: false,
      isResendLoading: false,
      error: null,
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
    loginRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      loading: false,
      isLoggedIn: action.payload !== false,
      userData: action.payload,
    }),
    loginFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
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
} = authSlice.actions;

export default authSlice.reducer;
