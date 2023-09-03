import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const isEmpty = (array) => !array?.length;

const getCardService = () => DataService.get(API.myTeams.cardInfo);

const getTeamsService = ({ searchText, metaData, filterData, isTeam = false, team_id = '' }) => {
  let QUERY = `is_team=${isTeam}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  // filter query options
  if (searchText?.length) QUERY += `&search_query=${searchText}`;
  if (!isEmpty(filterData?.project_status)) QUERY += `&project_status=${filterData?.project_status[0]}`;
  if (team_id?.length) QUERY += `&team_id=${team_id}`;

  DataService.get(`${API.myTeams.listTeams}?${QUERY}`);
};

const getInvitationsService = ({ metaData, filterData, userType, isTeam = false, team_id = '' }) => {
  let QUERY = `is_team=${isTeam}&user_type=${userType}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  // filter query options
  if (team_id?.length) QUERY += `&team_id=${team_id}`;
  if (!isEmpty(filterData?.project_types)) QUERY += `&project=${filterData?.project_types[0]}`;
  if (!isEmpty(filterData?.invited_by)) QUERY += `&invited_by=${filterData?.invited_by[0]}`;
  if (!isEmpty(filterData?.statuses)) QUERY += `&status=${filterData?.statuses[0]}`;
  if (!isEmpty(filterData?.filter_type)) QUERY += `$filter_type=${filterData?.filter_type}`;

  return DataService.get(`${API.myTeams.listInvites}?${QUERY}`);
};

const getJoinReqService = ({ metaData, filterData, team_id = '', isTeam = false }) => {
  let QUERY = `is_team=${isTeam}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  if (team_id?.length) QUERY += `&team_id=${team_id}`;
  if (!isEmpty(filterData?.filter_type)) QUERY += `$filter_type=${filterData?.filter_type}`;

  return DataService.get(`${API.myTeams.listJoinReq}?${QUERY}`);
};

const getFavoriteService = ({ metaData, team_id = '', isTeam = false, userType, filterData }) => {
  let QUERY = `is_team=${isTeam}&page=${metaData?.page}&page_size=${metaData?.page_size}&user_type=${userType}`;
  if (team_id?.length) QUERY += `&team_id=${team_id}`;
  if (filterData?.is_alma_matter) QUERY += `&is_alma_matter=${filterData?.is_alma_matter}`;

  return DataService.get(`${API.myTeams.listFav}?${QUERY}`);
};

export { getCardService, getTeamsService, getFavoriteService, getJoinReqService, getInvitationsService };
