const API = {
  auth: {
    login: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/sign-in`,
    socialSignUpSingIn: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/social-auth/google`,
    registerEmail: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/email/create-otp`,
    verifyEmail: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/email/verify-otp`,
    createNewPassowrd: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/password/create`,
    registerPhone: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/phone/create-otp`,
    verifyPhone: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/phone/verify-otp`,
    forgotPassword: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/forgot-password/create`,
    verifyOtp: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/forgot-password/verify`,
    setNewPassword: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/forgot-password/change`,
  },
  static: {
    talentRoles: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/talent-role`,
    languages: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/language/all`,
    countries: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/country`,
    states: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/state-by-id`,
    cities: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/city`,
    institutes: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/institute/all`,
    educations: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/education/all`,
    tools: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/tools/all`,
    skills: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/skills/all`,
    timezones: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/timezone/all`,
    currencies: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/currency/all`,
    companyIndustries: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/company-industry/all`,
    projectAreas: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/static/project-area/all`,
  },
  talentOnboarding: {
    userDetails: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/details`,
    accountDetails: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/talent/account-details`,
    profileDetails: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/talent/profile-details`,
  },
  clientOnboarding: {
    accountDetails: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/client/account-details`,
    profileDetails: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/client/profile-details`,
  },
  profile: {
    talent: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/talent/details`,
    talentProjects: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/talent/get-recommanded-projects`,
    client: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/client/details`,
    clientProjects: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/client/completed-projects`,
    addToFav: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/favourite/set-user`,
    removeFav: `${import.meta.env.VITE_API_ENDPOINT}:4002/api/v1/favourite/remove`,
  },
  dashboard: {
    userData: `${import.meta.env.VITE_API_ENDPOINT}:4000/api/v1/user/details`,
  },
};

export default API;
