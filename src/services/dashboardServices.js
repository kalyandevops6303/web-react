import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

const recommendedProjectsService = () => DataService.get(API.dashboard.recommendedProjects);

const profilePercentageService = () => DataService.get(API.dashboard.profilePercentage);

const getProjectInviteService = () =>
  DataService.get(`${API.dashboard.projectInvites}?invitation_type=PROJECT&page=1&page_size=5`);

export { userDataService, recommendedProjectsService, profilePercentageService, getProjectInviteService };
