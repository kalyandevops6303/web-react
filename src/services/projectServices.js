import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(`${API.project.cardInfo}`);

const getProjectListingService = ({ metaData, data }) =>
  DataService.post(`${API.project.projects}?page=${metaData?.page}&page_size=${metaData?.page_size}`, data);

const getOngoingProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.ongoingProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getCompletedProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.comletedProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getUpcomingProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.upcomingProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getDisutedProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.disputedProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getTerminatedProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.terminatedProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getInvitedProjectListingService = ({ metaData, data }) =>
  DataService.post(
    `${API.project.invitedProjects}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${data?.search_query}`,
    data,
  );

const getProjectsListFlexternService = ({ metaData }) =>
  DataService.get(
    `${API.project.allProjectsFlextern}?page=${metaData?.page}&page_size=${metaData?.page_size}&search_query=${metaData?.search_query}&project_status=${metaData?.project_status}&department_name=${metaData?.department_name}`);

const getTeamNameSerive = (page, search) =>
  DataService.get(`${API.project.teamName}?page=${page}&page_size=50&search_query=${search}`);

const getClientNameService = (page, search) =>
  DataService.get(`${API.project.clientName}?page=${page}&page_size=50&search_query=${search}`);

export {
  getCompletedProjectListingService,
  getDisutedProjectListingService,
  getInvitedProjectListingService,
  getOngoingProjectListingService,
  getProjectListingService,
  getTerminatedProjectListingService,
  getUpcomingProjectListingService,
  getCardService,
  getTeamNameSerive,
  getClientNameService,
  getProjectsListFlexternService,
};
