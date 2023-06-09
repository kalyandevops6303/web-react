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
  static: {
    talentRoles: '/talent-role',
    languages: '/static/language/all',
    countries: '/static/country',
    states: '/static/state-by-id',
    cities: '/static/city',
    institutes: '/static/institute/all',
    educations: '/static/education/all',
    tools: '/static/tools/all',
    skills: '/static/skills/all',
    timezones: '/static/timezone/all',
    currencies: '/static/currency/all',
    companyIndustries: '/static/company-industry/all',
    projectAreas: '/static/project-area/all',
  },
  talentOnboarding: {
    userDetails: '/user/details',
    accountDetails: '/talent/account-details',
    profileDetails: '/talent/profile-details',
  },
  clientOnboarding: {
    accountDetails: '/client/account-details',
    profileDetails: '/client/profile-details',
  },
  dashboard: {
    userData: '/user/details',
  },
};

export default API;
