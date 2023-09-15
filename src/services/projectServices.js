import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = ({ userType }) => {
  const QUERY = `is_team=${userType === 'TEAM'}`;
  return DataService.get(`${API.project.cardInfo}?${QUERY}`);
};

const getProjectListingService = ({ metaData, primaryFilter, userType, searchText }) => {
  let QUERY = `is_team=${userType === 'TEAM'}&page=${metaData?.page}&page_size=${
    metaData?.page_size
  }&project_filter=${primaryFilter}`;

  if (searchText?.length) QUERY += `&search_query=${searchText}`;

  return DataService.get(`${API.project.projects}?${QUERY}`);
};

export { getCardService, getProjectListingService };
