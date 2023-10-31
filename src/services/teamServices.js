import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTeamService = () => DataService.get(`${API.team.getTeam}?page=1&page_size=50`);

const getTeamById = (id) => DataService.get(`${API.team.teamById}/${id}`);

const createTeamService = (data) => DataService.post(API.team.create, data);

const updateTeamService = (data) => DataService.put(API.team.update, data);

const getInvitedByService = ({ invitation_id }) =>
  DataService.get(`${API.team.getInvitation}/${invitation_id}?page=1&page_size=20`);

const getInviteDetails = (id) => DataService.get(`${API.team.getInvitation}/${id}`);

export { createTeamService, getTeamService, getTeamById, getInvitedByService, updateTeamService, getInviteDetails };
