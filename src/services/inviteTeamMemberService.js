import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const bestTalentsService = (searchText, page, pageSize) =>
  DataService.get(`${API.inviteTeamMember.bestTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`);

const favoriteTalentsService = (searchText, page, pageSize) =>
  DataService.get(
    `${API.inviteTeamMember.favoriteTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const almaMaterTalentsService = (searchText, page, pageSize) =>
  DataService.get(
    `${API.inviteTeamMember.almaMaterTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const inviteTalentsService = (data) => DataService.post(`${API.inviteTeamMember.sendInvitaion}`, data);

const getTeamMeberforInviteService = (searchText, page, pageSize) =>
  DataService.get(`${API.inviteTeamMember.getTeamMember}?search_text=${searchText}&page=${page}&page_size=${pageSize}`);

export {
  bestTalentsService,
  getTeamMeberforInviteService,
  favoriteTalentsService,
  almaMaterTalentsService,
  inviteTalentsService,
};
