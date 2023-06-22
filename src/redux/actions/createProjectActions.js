import errorHandler from '../../utility/errorHandler';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import {
  bestTalentsFailure,
  bestTalentsRequest,
  bestTalentsSuccess,
  createProjectFailure,
  createProjectRequest,
  createProjectSuccess,
  inviteTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
} from '../reducers/createProject';
import { bestTalentsService, createProjectService, inviteTalentsService } from '../../services/createProjectServices';

const getBestTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(bestTalentsRequest());
  try {
    const res = await bestTalentsService(projectId, searchText, page, pageSize);
    dispatch(bestTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const createNewProject = (data, onSuccess) => async (dispatch) => {
  dispatch(createProjectRequest());
  try {
    const res = await createProjectService(data);
    dispatch(createProjectSuccess(res.data.data));
    dispatch(getBestTalents(res.data.data.project_id, '', 1, 10, []));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, createProjectFailure);
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

export { createNewProject, getBestTalents, inviteTalents };
