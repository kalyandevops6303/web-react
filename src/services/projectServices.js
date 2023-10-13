import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(`${API.project.cardInfo}`);

const getProjectListingService = ({ metaData, data }) =>
  DataService.post(`${API.project.projects}?page=${metaData?.page}&page_size=${metaData?.page_size}`, data);

const getTeamNameSerive = (page, search) =>
  DataService.get(`${API.project.teamName}?page=${page}&page_size=50&search_query=${search}`);

const getClientNameService = (page, search) =>
  DataService.get(`${API.project.clientName}?page=${page}&page_size=50&search_query=${search}`);

export { getCardService, getProjectListingService, getTeamNameSerive, getClientNameService };
