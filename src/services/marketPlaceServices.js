import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(API.marketplace.cardInfo);

const getListProjectService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.listProject}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getReceivedBidProjectService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.receivedBids}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getMyBidProjectService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.myBids}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getTalentsService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.listTalents}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getClientsService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.listClients}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getTeamsService = ({ postData, searchText, metaData }) =>
  DataService.post(
    `${API.marketplace.listTeams}?search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

export {
  getCardService,
  getListProjectService,
  getTeamsService,
  getReceivedBidProjectService,
  getMyBidProjectService,
  getTalentsService,
  getClientsService,
};
