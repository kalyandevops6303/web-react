import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getAllClubsService = ({ filterData, metaData }) =>
  DataService.post(`${API.clubs.listClubs}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getMyClubsService = ({ filterData, metaData }) =>
  DataService.post(`${API.clubs.listMyClubs}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getFavClubsService = ({ filterData, metaData }) =>
  DataService.post(`${API.clubs.listFav}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

export { getAllClubsService, getMyClubsService, getFavClubsService };
