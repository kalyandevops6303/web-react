const apiAuthEndpoint = `${import.meta.env.VITE_API_ENDPOINT}:1443`;
const apiOnboardingEndpoint = `${import.meta.env.VITE_API_ENDPOINT}:3443`;
const apiCreateProjectEndpoint = `${import.meta.env.VITE_API_ENDPOINT}:2443`;

const API = {
  auth: {
    login: `${apiAuthEndpoint}/api/v1/user/sign-in`,
    socialSignUpSingIn: `${apiAuthEndpoint}/api/v1/user/social-auth/google`,
    registerEmail: `${apiAuthEndpoint}/api/v1/user/email/create-otp`,
    verifyEmail: `${apiAuthEndpoint}/api/v1/user/email/verify-otp`,
    createNewPassowrd: `${apiAuthEndpoint}/api/v1/user/password/create`,
    registerPhone: `${apiAuthEndpoint}/api/v1/user/phone/create-otp`,
    verifyPhone: `${apiAuthEndpoint}/api/v1/user/phone/verify-otp`,
    forgotPassword: `${apiAuthEndpoint}/api/v1/user/forgot-password/create`,
    verifyOtp: `${apiAuthEndpoint}/api/v1/user/forgot-password/verify`,
    setNewPassword: `${apiAuthEndpoint}/api/v1/user/forgot-password/change`,
    resetPassword: `${apiAuthEndpoint}/api/v1/user/reset-password`,
  },
  static: {
    talentRoles: `${apiAuthEndpoint}/api/v1/static/talent-role`,
    languages: `${apiAuthEndpoint}/api/v1/static/language/all`,
    countries: `${apiAuthEndpoint}/api/v1/static/country`,
    states: `${apiAuthEndpoint}/api/v1/static/state-by-id`,
    cities: `${apiAuthEndpoint}/api/v1/static/city`,
    institutes: `${apiAuthEndpoint}/api/v1/static/institute/all`,
    paginatedInstitutes: `${apiAuthEndpoint}/api/v1/static/institute/paginated`,
    educations: `${apiAuthEndpoint}/api/v1/static/education/all`,
    tools: `${apiAuthEndpoint}/api/v1/static/tools/all`,
    skills: `${apiAuthEndpoint}/api/v1/static/skills/all`,
    certificates: `${apiAuthEndpoint}/api/v1/static/certificates/all`,
    timezones: `${apiAuthEndpoint}/api/v1/static/timezone/all`,
    currencies: `${apiAuthEndpoint}/api/v1/static/currency/all`,
    companyIndustries: `${apiAuthEndpoint}/api/v1/static/company-industry/all`,
    projectAreas: `${apiAuthEndpoint}/api/v1/static/project-area/all`,
  },
  talentOnboarding: {
    userDetails: `${apiAuthEndpoint}/api/v1/user/details`,
    accountDetails: `${apiAuthEndpoint}/api/v1/talent/account-details`,
    profileDetails: `${apiAuthEndpoint}/api/v1/talent/profile-details`,
    checkpointComplete: `${apiAuthEndpoint}/api/v1/user/checkpoint/complete`,
    profileImageUpload: `${apiAuthEndpoint}/api/v1/user/profile/image-url`,
  },
  clientOnboarding: {
    accountDetails: `${apiAuthEndpoint}/api/v1/client/account-details`,
    profileDetails: `${apiAuthEndpoint}/api/v1/client/profile-details`,
  },
  profile: {
    talent: `${apiOnboardingEndpoint}/api/v1/talent/details`,
    talentProjects: `${apiOnboardingEndpoint}/api/v1/talent/get-recommanded-projects`,
    client: `${apiOnboardingEndpoint}/api/v1/client/details`,
    clientProjects: `${apiOnboardingEndpoint}/api/v1/client/completed-projects`,
    addToFav: `${apiOnboardingEndpoint}/api/v1/favourite/set-user`,
    removeFav: `${apiOnboardingEndpoint}/api/v1/favourite/remove`,
    addToFavProject: `${apiOnboardingEndpoint}/api/v1/favourite/set-project`,
  },
  dashboard: {
    userData: `${apiAuthEndpoint}/api/v1/user/details`,
    recommendedProjects: `${apiOnboardingEndpoint}/api/v1/talent/get-recommended-projects`,
    profilePercentage: `${apiAuthEndpoint}/api/v1/user/profile-percentage`,
    // team
    getTeamMember: `${apiOnboardingEndpoint}/api/v1/team/get-members`,
    getInvitedMember: `${apiOnboardingEndpoint}/api/v1/team/invite-member`,
    joinRequest: `${apiOnboardingEndpoint}/api/v1/teams/join-request`,
    recommendedTalent: `${apiOnboardingEndpoint}/api/v1/teams/recommended-talents`,

    // talent
    recommendedTeams: `${apiOnboardingEndpoint}/api/v1/talent/get-recommended-teams`,
    teamInvitaion: `${apiOnboardingEndpoint}/api/v1/talent/team-invite`,
    getMyTeam: `${apiOnboardingEndpoint}/api/v1/talent/my-teams`,
    projectInvites: `${apiOnboardingEndpoint}/api/v1/user/alerts/invitations`,
  },
  createProject: {
    createProject: `${apiCreateProjectEndpoint}/api/v1/project/create`,
    bestTalents: `${apiCreateProjectEndpoint}/api/v1/project/best-talents`,
    favoriteTalents: `${apiCreateProjectEndpoint}/api/v1/project/favorite-talents`,
    almaMaterTalents: `${apiCreateProjectEndpoint}/api/v1/project/alma-mater-talents`,
    inviteTalents: `${apiCreateProjectEndpoint}/api/v1/project/invite-talents`,
    projectFileUpload: `${apiCreateProjectEndpoint}/api/v1/project/file`,
  },
  marketplace: {
    client: {
      cardInfo: `${apiOnboardingEndpoint}/api/v1/client/cards-info`,
      listProject: `${apiOnboardingEndpoint}/api/v1/client/list-projects`,
      listTalents: `${apiOnboardingEndpoint}/api/v1/client/list-talents`,
    },
    talent: {
      cardInfo: `${apiOnboardingEndpoint}/api/v1/talent/cards-info`,
      listProject: `${apiOnboardingEndpoint}/api/v1/talent/list-projects`,
      listClients: `${apiOnboardingEndpoint}/api/v1/talent/list-clients`,
    },
  },
  globalSearch: {
    search: `${apiOnboardingEndpoint}/api/v1/search`,
  },
  notifications: {
    allNotifications: `${apiOnboardingEndpoint}/api/v1/notification/all`,
    subscribe: `${apiAuthEndpoint}/api/v1/user/subscribe`,
    unsubscribe: `${apiAuthEndpoint}/api/v1/user/unsubscribe`,
  },
  team: {
    getTeam: `${apiOnboardingEndpoint}/api/v1/talent/my-teams`,
    teamById: `${apiOnboardingEndpoint}/api/v1/teams`,
    create: `${apiAuthEndpoint}/api/v1/team/create`,
  },
};

export default API;
