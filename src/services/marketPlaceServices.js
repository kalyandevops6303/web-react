import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTalentCardService = () => DataService.get(API.marketplace.talent.cardInfo);

const getClientCardService = () => DataService.get(API.marketplace.client.cardInfo);

const getListProjectTalentService = ({ postData, searchText, metaData, isRecommanded }) =>
  DataService.post(
    `${API.marketplace.talent.listProject}?is_recommended=${isRecommanded}&search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getListProjectClientService = ({ postData, searchText, metaData, isMyListing }) =>
  DataService.post(
    `${API.marketplace.client.listProject}?is_my_listings=${isMyListing}&search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getTalentsService = ({ postData, searchText, metaData, isRecommanded }) =>
  DataService.post(
    `${API.marketplace.client.listTalents}?is_recommended=${isRecommanded}&search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

const getClientsService = ({ postData, searchText, metaData, isRecommanded }) =>
  DataService.post(
    `${API.marketplace.talent.listClients}?is_recommended=${isRecommanded}&search_text=${searchText}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
    postData,
  );

export {
  getTalentsService,
  getClientsService,
  getTalentCardService,
  getClientCardService,
  getListProjectTalentService,
  getListProjectClientService,
};
