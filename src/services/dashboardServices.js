import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

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

const getMyTeamService = () => DataService.get(`${API.dashboard.getMyTeam}?page=1&page_size=30`);
const getProjectInviteService = () =>
  DataService.get(`${API.dashboard.projectInvites}?invitation_type=PROJECT&page=1&page_size=5`);

const validateUrlService = (data) => DataService.post(API.dashboard.validateUrl, data);

const updateInvitationService = (data) => DataService.post(API.dashboard.updateInvitation, data);

const teamProfilePercentageService = () => DataService.get(API.dashboard.teamProfilePercentage);

export {
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
};
