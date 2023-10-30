import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getClubsService = ({ filterData, metaData }) =>
  DataService.post(`${API.clubs.listClubs}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getClubsCardInfoService = () => DataService.get(API.clubs.cardInfo);

export { getClubsService, getClubsCardInfoService };
