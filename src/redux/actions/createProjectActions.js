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
} from '../reducers/createProject';
import { bestTalentsService, createProjectService } from '../../services/createProjectServices';

const getBestTalents = (projectId, searchText, page, pageSize) => async (dispatch) => {
  dispatch(bestTalentsRequest());
  try {
    const res = await bestTalentsService(projectId, searchText, page, pageSize);
    dispatch(bestTalentsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const createNewProject = (data, onSuccess) => async (dispatch) => {
  dispatch(createProjectRequest());
  try {
    const res = await createProjectService(data);
    dispatch(createProjectSuccess(res.data.data));
    dispatch(getBestTalents(res.data.data.project_id, '', 1, 10));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, createProjectFailure);
  }
};

export { createNewProject, getBestTalents };
