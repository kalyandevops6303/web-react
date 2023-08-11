import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTeamService = (data) => DataService.get(API.team.getTeam, data);

// eslint-disable-next-line import/prefer-default-export
export { getTeamService };
