const API = {
  auth: {
    login: '4000/api/v1/user/sign-in',
    socialSignUpSingIn: '4000/api/v1/user/social-auth/google',
    registerEmail: '4000/api/v1/user/email/create-otp',
    verifyEmail: '4000/api/v1/user/email/verify-otp',
    createNewPassowrd: '4000/api/v1/user/password/create',
    registerPhone: '4000/api/v1/user/phone/create-otp',
    verifyPhone: '4000/api/v1/user/phone/verify-otp',
    forgotPassword: '4000/api/v1/user/forgot-password/create',
    verifyOtp: '4000/api/v1/user/forgot-password/verify',
    setNewPassword: '4000/api/v1/user/forgot-password/change',
  },
  static: {
    talentRoles: '4000/api/v1/talent-role',
    languages: '4000/api/v1/static/language/all',
    countries: '4000/api/v1/static/country',
    states: '4000/api/v1/static/state-by-id',
    cities: '4000/api/v1/static/city',
    institutes: '4000/api/v1/static/institute/all',
    educations: '4000/api/v1/static/education/all',
    tools: '4000/api/v1/static/tools/all',
    skills: '4000/api/v1/static/skills/all',
    timezones: '4000/api/v1/static/timezone/all',
    currencies: '4000/api/v1/static/currency/all',
    companyIndustries: '4000/api/v1/static/company-industry/all',
    projectAreas: '4000/api/v1/static/project-area/all',
  },
  talentOnboarding: {
    userDetails: '4000/api/v1/user/details',
    accountDetails: '4000/api/v1/talent/account-details',
    profileDetails: '4000/api/v1/talent/profile-details',
  },
  clientOnboarding: {
    accountDetails: '4000/api/v1/client/account-details',
    profileDetails: '4000/api/v1/client/profile-details',
  },
  profile: {
    talent: '4002/api/v1/talent/details',
    talentProjects: '4002/api/v1/talent/get-recommanded-projects',
    client: '4002/api/v1/client/details',
    clientProjects: '4002/api/v1/client/completed-projects',
    addToFav: '4002/api/v1/favourite/set-user',
    removeFav: '4002/api/v1/favourite/remove',
  },
  dashboard: {
    userData: '/user/details',
  },
};

export default API;
