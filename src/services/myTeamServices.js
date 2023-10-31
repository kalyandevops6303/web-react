import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(`${API.myTeams.cardInfo}`);

const getTeamsService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listTeams}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getInvitationsService = ({ filterData, metaData }) =>
  DataService.get(`${API.myTeams.listInvites}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getJoinReqService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listJoinReq}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getFavoriteService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listFav}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getTalentListingService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listTalents}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getClientListingService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listClients}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getRecommendationListingService = ({ filterData, metaData }) =>
  DataService.post(`${API.myTeams.listRecomm}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

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
