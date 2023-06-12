import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTalentService = (data) => DataService.get(`${API.profile.talent}/${data}`);

const getTalentProjectService = (data) => DataService.get(API.profile.talentProjects, data);

const getClientService = (data) => DataService.get(`${API.profile.client}/${data}`);

const getClientProjectService = (data) => DataService.get(API.profile.clientProjects, data);

const makeFavService = (id, user_type) => DataService.post(API.profile.addToFav, { user_id: id, user_type });

const removeFavService = (id) => DataService.post(API.profile.removeFav, { user_id: id });

export {
  getTalentService,
  getTalentProjectService,
  getClientService,
  getClientProjectService,
  makeFavService,
  removeFavService,
};
