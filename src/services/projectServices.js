import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(API.project.cardInfo);

const getProjectListingService = ({ metaData, primaryFilter, team_id = '', isTeam = false, searchText }) => {
  let QUERY = `is_team=${isTeam}&page=${metaData?.page}&page_size=${metaData?.page_size}&project_filter=${primaryFilter}`;

  if (searchText?.length) QUERY += `&search_query=${searchText}`;
  if (team_id?.length) QUERY += `&team_id=${team_id}`;

  return DataService.get(`${API.project.projects}?${QUERY}`);
};

export { getCardService, getProjectListingService };
