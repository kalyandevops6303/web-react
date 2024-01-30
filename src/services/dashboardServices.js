import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

const totalReferralAmountService = () => DataService.get(API.dashboard.totalReferralAmount);

const recommendedProjectsService = () => DataService.get(API.dashboard.recommendedProjects);

const profilePercentageService = () => DataService.get(API.dashboard.profilePercentage);

const getTeamMemberService = ({ metadata }) =>
  DataService.get(`${API.dashboard.getTeamMember}?page=${metadata?.page}&page_size=${metadata?.page_size}`);

const getInvitedTeamMemberService = ({ metadata }) =>
  DataService.get(`${API.dashboard.getInvitedMember}?page=${metadata?.page}&page_size=${metadata?.page_size}`);

const getJoinRequestService = (data) => DataService.get(API.dashboard.joinRequest, data);

const getRecommendedTalentService = (data) => DataService.get(API.dashboard.recommendedTalent, data);

const removeMemberService = (data) => DataService.delete(API.dashboard.removeMember, data);

const getRecommendedTeamService = () => DataService.get(API.dashboard.recommendedTeams);

const getTeamInvitationService = () => DataService.get(API.dashboard.teamInvitaion);

const recommendedProjectsTeamService = () => DataService.get(API.dashboard.recommendedProjectsTeam);

const getMyTeamService = () => DataService.get(`${API.dashboard.getMyTeam}?page=1&page_size=100`);
const getProjectInviteService = () =>
  DataService.get(`${API.dashboard.projectInvites}?invitation_type=PROJECT&page=1&page_size=5`);

const validateUrlService = (data) => DataService.post(API.dashboard.validateUrl, data);

const updateInvitationService = (data) => DataService.post(API.dashboard.updateInvitation, data);

const teamProfilePercentageService = () => DataService.get(API.dashboard.teamProfilePercentage);

const alertService = () => DataService.get(`${API.notifications.alerts}?page=1&page_size=4`);

const activeProjectsForClientService = () => DataService.get(API.dashboard.activeProjectsForClient);

const upcomingProjectsForClientService = () => DataService.get(API.dashboard.upcomingProjectsForClient);

const projectsBidsForClientService = () => DataService.get(API.dashboard.projectsBidsForClient);

const recommendedTeamsForClientService = () => DataService.get(API.dashboard.recommendedTeamsForClient);

const checkBidsAcceptedService = () =>
  DataService.post(API.dashboard.checkBidsAccepted, {
    bid_statuses: ['ACCEPTED'],
  });

const activeProjectsForTalentService = () => DataService.get(API.dashboard.activeProjectsForTalent);

const upcomingProjectsForTalentService = () => DataService.get(API.dashboard.upcomingProjectsForTalent);

const activeProjectsForTeamService = () => DataService.get(API.dashboard.activeProjectsForTeam);

const upcomingProjectsForTeamService = () => DataService.get(API.dashboard.upcomingProjectsForTeam);

const getModalDataService = ({ project_id }) =>
  DataService.get(`${API.dashboard.getProjectDetails}?project_id=${project_id}`);

const updateCardStatusService = (data) => DataService.post(API.dashboard.updateCardStatus, data);

export {
  alertService,
  getModalDataService,
  recommendedProjectsTeamService,
  userDataService,
  removeMemberService,
  recommendedProjectsService,
  profilePercentageService,
  getTeamMemberService,
  getInvitedTeamMemberService,
  getJoinRequestService,
  getRecommendedTalentService,
  getRecommendedTeamService,
  getTeamInvitationService,
  getMyTeamService,
  getProjectInviteService,
  validateUrlService,
  updateInvitationService,
  teamProfilePercentageService,
  activeProjectsForClientService,
  upcomingProjectsForClientService,
  projectsBidsForClientService,
  recommendedTeamsForClientService,
  checkBidsAcceptedService,
  activeProjectsForTalentService,
  upcomingProjectsForTalentService,
  activeProjectsForTeamService,
  upcomingProjectsForTeamService,
  totalReferralAmountService,
  updateCardStatusService,
};
