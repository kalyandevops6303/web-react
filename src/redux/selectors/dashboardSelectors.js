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
};
