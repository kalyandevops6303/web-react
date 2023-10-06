import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTalentService = (data) => DataService.get(`${API.profile.talent}/${data}`);

const getTalentProjectService = (data) => DataService.get(API.profile.talentProjects, data);

const getClientService = (data) => DataService.get(`${API.profile.client}/${data}`);

const getClientProjectService = (data) => DataService.get(API.profile.clientProjects, data);

const makeFavService = (id, user_type) => DataService.post(API.profile.addToFav, { user_id: id, user_type });

const makeFavTeamService = (id, user_type) => DataService.post(API.profile.addToFavTeam, { team_id: id, user_type });

const removeFavService = (data) => DataService.post(API.profile.removeFav, data);

const makeProjectFavService = (id) => DataService.post(API.profile.addToFavProject, { project_id: id });

const getRecentProjectService = ({ user_id, entity, metadata }) =>
  DataService.get(
    `${API.profile.recentProjects}/${user_id}?entity=${entity}&page=${metadata?.page}&page_size=${metadata?.page_size}`,
  );

const getReviewService = ({ user_id, entity, metadata }) =>
  DataService.get(
    `${API.profile.reviews}/${user_id}?entity=${entity}&page=${metadata?.page}&page_size=${metadata?.page_size}`,
  );

export {
  makeFavTeamService,
  getRecentProjectService,
  getReviewService,
  getTalentService,
  getTalentProjectService,
  getClientService,
  getClientProjectService,
  makeFavService,
  removeFavService,
  makeProjectFavService,
};
