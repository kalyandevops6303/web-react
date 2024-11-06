import { isFlexternshipApp } from '@/configs/api/env';
import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getTalentService = (data) =>
  isFlexternshipApp
    ? DataService.get(`${API.profile.talentFlextern}/${data}`)
    : DataService.get(`${API.profile.talent}/${data}`);

const getTalentProjectService = (data) =>
  isFlexternshipApp
    ? DataService.get(API.profile.talentProjectsFlextern, data)
    : DataService.get(API.profile.talentProjects, data);

const getClientService = (data, projectId) => {
  if (projectId) {
    return isFlexternshipApp
      ? DataService.get(`${API.profile.clientFlextern}/${data}?project_id=${projectId}`)
      : DataService.get(`${API.profile.client}/${data}?project_id=${projectId}`);
  }

  return isFlexternshipApp
    ? DataService.get(`${API.profile.clientFlextern}/${data}`)
    : DataService.get(`${API.profile.client}/${data}`);
};

const getClientProjectService = (data) => DataService.get(API.profile.clientProjects, data);

const makeFavService = (id, user_type) => DataService.post(API.profile.addToFav, { user_id: id, user_type });

const makeFavTeamService = (id, user_type) => DataService.post(API.profile.addToFavTeam, { team_id: id, user_type });

const removeFavService = (data) => DataService.post(API.profile.removeFav, data);

const makeProjectFavService = (id) => DataService.post(API.profile.addToFavProject, { project_id: id });

const makeProjectFavServiceFlextern = (id) => DataService.post(API.profile.addToFavProjectFlextern, { project_id: id });

const getRecentProjectService = ({ user_id, entity, metadata }) =>
  DataService.get(
    `${API.profile.recentProjects}/${user_id}?entity=${entity}&page=${metadata?.page}&page_size=${metadata?.page_size}`,
  );

const getReviewService = ({ user_id, entity, metadata }) =>
  DataService.get(
    `${API.profile.reviews}/${user_id}?entity=${entity}&page=${metadata?.page}&page_size=${metadata?.page_size}`,
  );

const reportService = (data) => DataService.post(`${API.profile.report}`, data);

const publicTeamMembersService = (teamId, page, pageSize) =>
  DataService.get(`${API.profile.publicTeamMembers}?global_team_id=${teamId}&page=${page}&page_size=${pageSize}`);

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
  makeProjectFavServiceFlextern,
  reportService,
  publicTeamMembersService,
};
