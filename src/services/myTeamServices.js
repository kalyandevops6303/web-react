import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(API.myTeams.cardInfo);

const getTeamsService = ({ searchText, metaData }) =>
  DataService.get(
    `${API.myTeams.listTeams}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
  );

const getInvitationsService = ({ searchText, metaData }) =>
  DataService.get(
    `${API.myTeams.listInvites}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
  );

const getJoinReqService = ({ searchText, metaData }) =>
  DataService.get(
    `${API.myTeams.listJoinReq}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
  );

const getFavoriteService = ({ searchText, metaData }) =>
  DataService.get(
    `${API.myTeams.listFav}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
  );

export { getCardService, getTeamsService, getFavoriteService, getJoinReqService, getInvitationsService };
