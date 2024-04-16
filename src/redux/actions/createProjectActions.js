import errorHandler from '../../utility/errorHandler';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import {
  almaMaterTalentsFailure,
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  bestTalentsFailure,
  bestTalentsRequest,
  bestTalentsSuccess,
  createProjectAIFailure,
  createProjectAIRequest,
  createProjectAISuccess,
  createProjectFailure,
  createProjectRequest,
  createProjectSuccess,
  favoriteTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  favoriteTeamsFailure,
  favoriteTeamsRequest,
  favoriteTeamsSuccess,
  inviteTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
} from '../reducers/createProject';
import {
  almaMaterTalentsService,
  bestTalentsService,
  createProjectAIService,
  createProjectService,
  favoriteTalentsService,
  favoriteTeamsService,
  inviteTalentsService,
} from '../../services/createProjectServices';
import { skillsAIService, toolsAIService } from '../../services/staticServices';
import {
  skillsAIFailure,
  skillsAIRequest,
  skillsAISuccess,
  toolsAIFailure,
  toolsAIRequest,
  toolsAISuccess,
} from '../reducers/static';
import { scanAndProcessFiles } from '../../utility/Utils';

const getBestTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(bestTalentsRequest());
  }
  try {
    const res = await bestTalentsService(projectId, searchText, page, pageSize);
    dispatch(bestTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const getFavoriteTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(favoriteTalentsRequest());
  }
  try {
    const res = await favoriteTalentsService(projectId, searchText, page, pageSize);
    dispatch(favoriteTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, favoriteTalentsFailure);
  }
};

const getFavoriteTeams = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(favoriteTeamsRequest());
  }
  try {
    const res = await favoriteTeamsService(projectId, searchText, page, pageSize);
    dispatch(favoriteTeamsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, favoriteTeamsFailure);
  }
};

const getAlmaMaterTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(almaMaterTalentsRequest());
  }
  try {
    const res = await almaMaterTalentsService(projectId, searchText, page, pageSize);
    dispatch(almaMaterTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, almaMaterTalentsFailure);
  }
};

const createNewProject = (data, onSuccess) => async (dispatch) => {
  dispatch(createProjectRequest());
  try {
    const handleCreateProject = async () => {
      const res = await createProjectService(data);
      dispatch(createProjectSuccess(res.data.data));
      dispatch(getBestTalents(res.data.data.project_id, '', 1, 10, []));
      dispatch(getFavoriteTeams(res.data.data.project_id, '', 1, 10, []));
      dispatch(getAlmaMaterTalents(res.data.data.project_id, '', 1, 10, []));
      ShowToastMessage(SUCCESS, res.data.data.message);
      onSuccess();
    };
    if (data?.details?.documents?.length > 0) {
      scanAndProcessFiles({
        fileData: data?.details?.documents,
        handleMainAPI: handleCreateProject,
        onError: () => dispatch(createProjectFailure()),
        isPrivate: true,
      });
    } else {
      handleCreateProject();
    }
  } catch (error) {
    errorHandler(error, createProjectFailure);
  }
};

const createProjectDetailsFromAI = (data, onSuccess) => async (dispatch) => {
  dispatch(createProjectAIRequest());
  try {
    const res = await createProjectAIService(data);
    dispatch(createProjectAISuccess(res.data.data.response));
    ShowToastMessage(SUCCESS, res.data.data.message || 'Success');
    onSuccess(res.data.data.response);
  } catch (error) {
    errorHandler(error, createProjectAIFailure);
  }
};

const filterAISkills = (skillsData) => async (dispatch) => {
  dispatch(skillsAIRequest());
  try {
    const skillsRes = await skillsAIService(skillsData);
    dispatch(skillsAISuccess(skillsRes.data.data));
  } catch (error) {
    errorHandler(error, skillsAIFailure);
  }
};

const filterAITools = (toolsData) => async (dispatch) => {
  dispatch(toolsAIRequest());
  try {
    const toolsRes = await toolsAIService(toolsData);
    dispatch(toolsAISuccess(toolsRes.data.data));
  } catch (error) {
    errorHandler(error, toolsAIFailure);
  }
};

const inviteTalents = (projectId, data, onSuccess) => async (dispatch) => {
  dispatch(inviteTalentsRequest());
  try {
    const res = await inviteTalentsService(projectId, data);
    dispatch(inviteTalentsSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, inviteTalentsFailure);
  }
};

export {
  createNewProject,
  getBestTalents,
  getFavoriteTalents,
  getFavoriteTeams,
  getAlmaMaterTalents,
  inviteTalents,
  createProjectDetailsFromAI,
  filterAISkills,
  filterAITools,
};
