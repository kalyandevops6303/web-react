import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const searchService = ({ query, metaData, scope }) => {
  const baseEndpoint = `${API.globalSearch.search}`;
  const queryString = `query=${query}&page=${metaData?.page}&page_size=${metaData?.page_size}`;
  const endpoint = scope ? `${baseEndpoint}?scope=${scope}&${queryString}` : `${baseEndpoint}?${queryString}`;

  return DataService.get(endpoint);
};

// eslint-disable-next-line import/prefer-default-export
export { searchService };
