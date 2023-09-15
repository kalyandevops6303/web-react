import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const isEmpty = (array) => !array?.length;

const getCardService = ({ userType }) => {
  const QUERY = `is_team=${userType === 'TEAM'}`;
  return DataService.get(`${API.myTeams.cardInfo}?${QUERY}`);
};

const getTeamsService = ({ searchText, metaData, filterData, userType }) => {
  let QUERY = `is_team=${userType === 'TEAM'}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  // filter query options
  if (searchText?.length) QUERY += `&search_query=${searchText}`;
  if (!isEmpty(filterData?.project_status)) QUERY += `&project_status=${filterData?.project_status[0]}`;

  return DataService.get(`${API.myTeams.listTeams}?${QUERY}`);
};

const getInvitationsService = ({ metaData, filterData, userType }) => {
  let QUERY = `is_team=${userType === 'TEAM'}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  // filter query options
  if (!isEmpty(filterData?.project_types)) QUERY += `&project=${filterData?.project_types[0]}`;
  if (!isEmpty(filterData?.invited_by)) QUERY += `&invited_by=${filterData?.invited_by[0]}`;
  if (!isEmpty(filterData?.statuses)) QUERY += `&status=${filterData?.statuses[0]}`;
  if (!isEmpty(filterData?.user_type)) QUERY += `&user_type=${filterData?.user_type[0]}`;
  if (!isEmpty(filterData?.filter_types)) QUERY += `&filter_type=${filterData?.filter_types[0]}`;

  return DataService.get(`${API.myTeams.listInvites}?${QUERY}`);
};

const getJoinReqService = ({ metaData, filterData, userType }) => {
  let QUERY = `is_team=${userType === 'TEAM'}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  if (!isEmpty(filterData?.filter_types)) QUERY += `&filter_type=${filterData?.filter_types[0]}`;
  if (!isEmpty(filterData?.invite_types)) QUERY += `&invite_type=${filterData?.invite_types[0]}`;
  if (!isEmpty(filterData?.statuses)) QUERY += `&status=${filterData?.statuses[0]}`;

  return DataService.get(`${API.myTeams.listJoinReq}?${QUERY}`);
};

const getFavoriteService = ({ metaData, filterData, userType }) => {
  let QUERY = `is_team=${userType === 'TEAM'}&page=${metaData?.page}&page_size=${metaData?.page_size}`;

  if (!isEmpty(filterData?.user_type)) QUERY += `&user_type=${filterData?.user_type[0]}`;
  if (filterData?.type[0] === 'alma matter') QUERY += `&is_alma_matter=true`;

  return DataService.get(`${API.myTeams.listFav}?${QUERY}`);
};

export { getCardService, getTeamsService, getFavoriteService, getJoinReqService, getInvitationsService };
