import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(`${API.myTeams.cardInfo}`);

const getTeamsService = ({ filterData }) => DataService.post(`${API.myTeams.listTeams}`, filterData);

const getInvitationsService = ({ filterData }) => DataService.get(`${API.myTeams.listInvites}`, filterData);

const getJoinReqService = ({ filterData }) => DataService.post(`${API.myTeams.listJoinReq}`, filterData);

const getFavoriteService = ({ filterData }) => DataService.post(`${API.myTeams.listFav}`, filterData);

const getTalentListingService = ({ filterData }) => DataService.post(`${API.myTeams.listTalents}`, filterData);

const getClientListingService = ({ filterData }) => DataService.post(`${API.myTeams.listClients}`, filterData);

const getRecommendationListingService = ({ filterData }) => DataService.post(`${API.myTeams.listRecomm}`, filterData);

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
