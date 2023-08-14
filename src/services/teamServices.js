import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createTeamService = (data) => DataService.post(API.team.create, data);

// eslint-disable-next-line import/prefer-default-export
export { createTeamService };
