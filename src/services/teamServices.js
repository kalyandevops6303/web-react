import API from '../configs/api';
/* eslint-disable import/no-cycle */
import DataService from '../configs/dataService/dataService';

const getTeamService = () => DataService.get(`${API.team.getTeam}?page=1&page_size=100`);

const getTeamById = (id) => DataService.get(`${API.team.teamById}/${id}`);

const getTeamInfoById = (id) => DataService.get(`${API.team.teamInfoById}?team_id=${id}`);

const createTeamService = (data) => DataService.post(API.team.create, data);

const updateTeamService = (data) => DataService.put(API.team.update, data);

const createDraftTeamService = (data) => DataService.post(API.team.createDraft, data);

const updateDraftTeamService = (id, data) => DataService.post(`${API.team.createDraft}?team_id=${id}`, data);

const checkDraftTeamService = (data) => DataService.get(`${API.team.checkDraft}?team_type=${data}`);

const deleteDraftTeamService = (id) => DataService.delete(`${API.team.deleteDraft}?team_id=${id}`);

const getInvitedByService = ({ invitation_id }) =>
  DataService.get(`${API.team.getInvitation}/${invitation_id}?page=1&page_size=20`);

const getInviteDetails = (id) => DataService.get(`${API.team.getInvitation}/${id}`);

export {
  createTeamService,
  getTeamService,
  getTeamById,
  getTeamInfoById,
  createDraftTeamService,
  updateDraftTeamService,
  checkDraftTeamService,
  deleteDraftTeamService,
  getInvitedByService,
  updateTeamService,
  getInviteDetails,
};