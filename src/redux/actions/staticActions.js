import errorHandler from '../../utility/errorHandler';
import {
  citiesService,
  companyIndustriesService,
  countriesService,
  currenciesService,
  educationsService,
  institutesService,
  languagesService,
  projectAreasService,
  skillsService,
  statesService,
  talentRolesService,
  timezonesService,
  toolsService,
} from '../../services/staticServices';
import {
  talentRolesRequest,
  talentRolesSuccess,
  talentRolesFailure,
  languagesRequest,
  languagesSuccess,
  languagesFailure,
  countriesRequest,
  countriesSuccess,
  countriesFailure,
  statesRequest,
  statesSuccess,
  statesFailure,
  citiesRequest,
  citiesSuccess,
  citiesFailure,
  institutesRequest,
  institutesSuccess,
  institutesFailure,
  educationsRequest,
  educationsSuccess,
  educationsFailure,
  toolsRequest,
  toolsSuccess,
  toolsFailure,
  skillsRequest,
  skillsSuccess,
  skillsFailure,
  timezonesRequest,
  timezonesSuccess,
  timezonesFailure,
  currenciesRequest,
  currenciesSuccess,
  currenciesFailure,
  companyIndustriesRequest,
  companyIndustriesSuccess,
  companyIndustriesFailure,
  projectAreasRequest,
  projectAreasSuccess,
  projectAreasFailure,
} from '../reducers/static';

const getTalentRoles = () => async (dispatch) => {
  dispatch(talentRolesRequest());
  try {
    const res = await talentRolesService();
    dispatch(talentRolesSuccess(res.data));
  } catch (error) {
    errorHandler(error, talentRolesFailure);
  }
};

const getLanguages = () => async (dispatch) => {
  dispatch(languagesRequest());
  try {
    const res = await languagesService();
    dispatch(languagesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, languagesFailure);
  }
};

const getCountries = () => async (dispatch) => {
  dispatch(countriesRequest());
  try {
    const res = await countriesService();
    dispatch(countriesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, countriesFailure);
  }
};

const getStates = (countryId) => async (dispatch) => {
  dispatch(statesRequest());
  try {
    const res = await statesService(countryId);
    dispatch(statesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, statesFailure);
  }
};

const getCities = (stateId) => async (dispatch) => {
  dispatch(citiesRequest());
  try {
    const res = await citiesService(stateId);
    dispatch(citiesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, citiesFailure);
  }
};

const getInstitutes = () => async (dispatch) => {
  dispatch(institutesRequest());
  try {
    const res = await institutesService();
    dispatch(institutesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, institutesFailure);
  }
};

const getEducations = () => async (dispatch) => {
  dispatch(educationsRequest());
  try {
    const res = await educationsService();
    dispatch(educationsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, educationsFailure);
  }
};

const getTools = () => async (dispatch) => {
  dispatch(toolsRequest());
  try {
    const res = await toolsService();
    dispatch(toolsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, toolsFailure);
  }
};

const getSkills = () => async (dispatch) => {
  dispatch(skillsRequest());
  try {
    const res = await skillsService();
    dispatch(skillsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, skillsFailure);
  }
};

const getTimezones = () => async (dispatch) => {
  dispatch(timezonesRequest());
  try {
    const res = await timezonesService();
    dispatch(timezonesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, timezonesFailure);
  }
};

const getCurrencies = () => async (dispatch) => {
  dispatch(currenciesRequest());
  try {
    const res = await currenciesService();
    dispatch(currenciesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, currenciesFailure);
  }
};

const getCompanyIndustries = () => async (dispatch) => {
  dispatch(companyIndustriesRequest());
  try {
    const res = await companyIndustriesService();
    dispatch(companyIndustriesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, companyIndustriesFailure);
  }
};

const getProjectAreas = () => async (dispatch) => {
  dispatch(projectAreasRequest());
  try {
    const res = await projectAreasService();
    dispatch(projectAreasSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectAreasFailure);
  }
};

export {
  getTalentRoles,
  getLanguages,
  getCountries,
  getStates,
  getCities,
  getInstitutes,
  getEducations,
  getTools,
  getSkills,
  getTimezones,
  getCurrencies,
  getCompanyIndustries,
  getProjectAreas,
};
