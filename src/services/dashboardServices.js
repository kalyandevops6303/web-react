import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

const recommendedProjectsService = () => DataService.get(API.dashboard.recommendedProjects);

const profilePercentageService = () => DataService.get(API.dashboard.profilePercentage);

const getTeamMemberService = () => DataService.get(API.dashboard.getTeamMember);

const getInvitedTeamMemberService = () => DataService.get(API.dashboard.getInvitedMember);

const getJoinRequestService = (data) => DataService.get(API.dashboard.joinRequest, data);

const getRecommendedTalentService = (data) => DataService.get(API.dashboard.recommendedTalent, data);

const getRecommendedTeamService = () => DataService.get(API.dashboard.recommendedTeams);

const getTeamInvitationService = () => DataService.get(API.dashboard.teamInvitaion);

const getMyTeamService = () => DataService.get(`${API.dashboard.getMyTeam}?page=1&page_size=20`);

export {
  userDataService,
  recommendedProjectsService,
  profilePercentageService,
  getTeamMemberService,
  getInvitedTeamMemberService,
  getJoinRequestService,
  getRecommendedTalentService,
  getRecommendedTeamService,
  getTeamInvitationService,
  getMyTeamService,
};
