import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const talentRolesService = () => DataService.get(API.static.talentRoles);

const languagesService = () => DataService.get(API.static.languages);

const countriesService = () => DataService.get(API.static.countries);

const statesService = (countryId) => DataService.get(`${API.static.states}/${countryId}`);

const citiesService = (stateId) => DataService.get(`${API.static.cities}/${stateId}`);

const institutesService = () => DataService.get(API.static.institutes);

const paginatedInstitutesService = (page, search) =>
  DataService.get(`${API.static.paginatedInstitutes}?page=${page}&page_size=100&search_query=${search}`);

const educationsService = () => DataService.get(API.static.educations);

const toolsService = () => DataService.get(API.static.tools);

const toolsAIService = (data) => DataService.post(API.static.toolsAI, data);

const skillsService = () => DataService.get(API.static.skills);

const skillsAIService = (data) => DataService.post(API.static.skillsAI, data);

const certificatesService = () => DataService.get(API.static.certificates);

const timezonesService = () => DataService.get(API.static.timezones);

const currenciesService = () => DataService.get(API.static.currencies);

const companyIndustriesService = () => DataService.get(API.static.companyIndustries);

const projectAreasService = () => DataService.get(API.static.projectAreas);

const servicesService = () => DataService.get(API.static.services);

const disputeTypesService = () => DataService.get(API.static.disputeTypes);

const ratingTagsService = (userType) => DataService.get(`${API.static.ratingTags}?tag_for=${userType}`);

const getIssueType = () => DataService.get(`${API.static.issueTypes}`);

export {
  talentRolesService,
  languagesService,
  countriesService,
  statesService,
  citiesService,
  institutesService,
  paginatedInstitutesService,
  educationsService,
  toolsService,
  skillsService,
  certificatesService,
  timezonesService,
  currenciesService,
  companyIndustriesService,
  projectAreasService,
  servicesService,
  disputeTypesService,
  ratingTagsService,
  skillsAIService,
  toolsAIService,
  getIssueType,
};
