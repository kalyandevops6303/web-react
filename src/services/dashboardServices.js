import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

const recommendedProjectsService = () => DataService.get(API.dashboard.recommendedProjects);

const profilePercentageService = () => DataService.get(API.dashboard.profilePercentage);

export { userDataService, recommendedProjectsService, profilePercentageService };
