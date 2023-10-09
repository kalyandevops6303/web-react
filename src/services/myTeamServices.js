import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(`${API.myTeams.cardInfo}`);

const getTeamsService = () => DataService.post(`${API.myTeams.listTeams}`);

const getInvitationsService = () => DataService.get(`${API.myTeams.listInvites}`);

const getJoinReqService = () => DataService.post(`${API.myTeams.listJoinReq}`);

const getFavoriteService = () => DataService.post(`${API.myTeams.listFav}`);

const getTalentListingService = () => DataService.post(`${API.myTeams.listTalents}`);

const getClientListingService = () => DataService.post(`${API.myTeams.listClients}`);

const getRecommendationListingService = () => DataService.post(`${API.myTeams.listRecomm}`);

export {
  getTalentListingService,
  getClientListingService,
  getRecommendationListingService,
  getCardService,
  getTeamsService,
  getFavoriteService,
  getJoinReqService,
  getInvitationsService,
};
