import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTeamService = () => DataService.get(`${API.team.getTeam}?page=1&page_size=20`);

const getTeamById = (id) => DataService.get(`${API.team.teamById}/${id}`);

const createTeamService = (data) => DataService.post(API.team.create, data);

export { createTeamService, getTeamService, getTeamById };
