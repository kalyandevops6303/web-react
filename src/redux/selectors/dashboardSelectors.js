import { createSelector } from '@reduxjs/toolkit';

const dashboardSelector = (state) => state.dashboard;
const authSelector = (state) => state.auth;

const userData = createSelector(authSelector, (auth) => auth.userData);
const userDataLoading = createSelector(authSelector, (auth) => auth.userDataLoading);

const recommendedProjects = createSelector(dashboardSelector, (dashboard) => dashboard.recommendedProjects);
const recommendedProjectsLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.recommendedProjectsLoading,
);

const profilePercentage = createSelector(dashboardSelector, (dashboard) => dashboard.profilePercentage);
const profilePercentageLoading = createSelector(dashboardSelector, (dashboard) => dashboard.profilePercentageLoading);

const selectGetTeamMember = createSelector(dashboardSelector, (dashboard) => dashboard.getTeamMember);
const selectGetTeamMemberLoading = createSelector(dashboardSelector, (dashboard) => dashboard.getTeamMemberLoading);

const selectGetInvitedMember = createSelector(dashboardSelector, (dashboard) => dashboard.getInvitedMember);
const selectGetInvitedMemberLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.getInvitedMemberLoading,
);

const selectJoinRequestMember = createSelector(dashboardSelector, (dashboard) => dashboard.joinRequestMember);
const selectJoinRequestMemberLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.joinRequestMemberLoading,
);

const selectRecommendedTalent = createSelector(dashboardSelector, (dashboard) => dashboard.recommendedTalent);
const selectRecommendedTalentLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.recommendedTalentLoading,
);

const selectRecommendedTeams = createSelector(dashboardSelector, (dashboard) => dashboard.recommendedTeams);
const selectRecommendedTeamsLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.recommendedTeamsLoading,
);

const selectTeamInvitation = createSelector(dashboardSelector, (dashboard) => dashboard.teamInvitation);
const selectTeamInvitationLoading = createSelector(dashboardSelector, (dashboard) => dashboard.teamInvitationLoading);

const selectProjectInvitation = createSelector(dashboardSelector, (dashboard) => dashboard.projectInvitation);
const selectProjectInvitationLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.projectInvitationLoading,
);

const selectGetMyTeam = createSelector(dashboardSelector, (dashboard) => dashboard.getMyTeam);
const selectGetMyTeamLoading = createSelector(dashboardSelector, (dashboard) => dashboard.getMyTeamLoading);

const activeProjectsForClient = createSelector(dashboardSelector, (dashboard) => dashboard.activeProjectsForClient);
const activeProjectsForClientLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.activeProjectsForClientLoading,
);

const upcomingProjectsForClient = createSelector(dashboardSelector, (dashboard) => dashboard.upcomingProjectsForClient);
const upcomingProjectsForClientLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.upcomingProjectsForClientLoading,
);

const projectsBidsForClient = createSelector(dashboardSelector, (dashboard) => dashboard.projectsBidsForClient);
const projectsBidsForClientLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.projectsBidsForClientLoading,
);

const recommendedTeamsForClient = createSelector(dashboardSelector, (dashboard) => dashboard.recommendedTeamsForClient);
const recommendedTeamsForClientLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.recommendedTeamsForClientLoading,
);

const checkBidsAccepted = createSelector(dashboardSelector, (dashboard) => dashboard.checkBidsAccepted);
const checkBidsAcceptedLoading = createSelector(dashboardSelector, (dashboard) => dashboard.checkBidsAcceptedLoading);

const activeProjectsForTalent = createSelector(dashboardSelector, (dashboard) => dashboard.activeProjectsForTalent);
const activeProjectsForTalentLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.activeProjectsForTalentLoading,
);

const upcomingProjectsForTalent = createSelector(dashboardSelector, (dashboard) => dashboard.upcomingProjectsForTalent);
const upcomingProjectsForTalentLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.upcomingProjectsForTalentLoading,
);

const activeProjectsForTeam = createSelector(dashboardSelector, (dashboard) => dashboard.activeProjectsForTeam);
const activeProjectsForTeamLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.activeProjectsForTeamLoading,
);

const upcomingProjectsForTeam = createSelector(dashboardSelector, (dashboard) => dashboard.upcomingProjectsForTeam);
const upcomingProjectsForTeamLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.upcomingProjectsForTeamLoading,
);

const totalReferralAmount = createSelector(dashboardSelector, (dashboard) => dashboard.totalReferralAmount);
const totalReferralAmountLoading = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.totalReferralAmountLoading,
);

const downloadUrl = createSelector(dashboardSelector, (dashboard) => dashboard.downloadUrl);
const downloadUrlLoading = createSelector(dashboardSelector, (dashboard) => dashboard.downloadUrlLoading);

export {
  userData,
  userDataLoading,
  recommendedProjects,
  recommendedProjectsLoading,
  profilePercentage,
  profilePercentageLoading,
  selectGetTeamMember,
  selectGetTeamMemberLoading,
  selectGetInvitedMember,
  selectGetInvitedMemberLoading,
  selectJoinRequestMember,
  selectJoinRequestMemberLoading,
  selectRecommendedTalent,
  selectRecommendedTalentLoading,
  selectRecommendedTeams,
  selectRecommendedTeamsLoading,
  selectTeamInvitation,
  selectTeamInvitationLoading,
  selectGetMyTeam,
  selectGetMyTeamLoading,
  activeProjectsForClient,
  activeProjectsForClientLoading,
  upcomingProjectsForClient,
  upcomingProjectsForClientLoading,
  projectsBidsForClient,
  projectsBidsForClientLoading,
  recommendedTeamsForClient,
  recommendedTeamsForClientLoading,
  checkBidsAccepted,
  checkBidsAcceptedLoading,
  activeProjectsForTalent,
  activeProjectsForTalentLoading,
  upcomingProjectsForTalent,
  upcomingProjectsForTalentLoading,
  activeProjectsForTeam,
  activeProjectsForTeamLoading,
  upcomingProjectsForTeam,
  upcomingProjectsForTeamLoading,
  totalReferralAmount,
  totalReferralAmountLoading,
  selectProjectInvitation,
  selectProjectInvitationLoading,
  downloadUrl,
  downloadUrlLoading,
};
