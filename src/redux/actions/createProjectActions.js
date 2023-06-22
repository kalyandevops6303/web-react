import errorHandler from '../../utility/errorHandler';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import { createProjectFailure, createProjectRequest, createProjectSuccess } from '../reducers/createProject';
import createProjectService from '../../services/createProjectServices';

const createNewProject = (data, onSuccess) => async (dispatch) => {
  dispatch(createProjectRequest());
  try {
    const res = await createProjectService(data);
    dispatch(createProjectSuccess(res.data.data));
    ShowToastMessage(SUCCESS, res.data.data.message);
    onSuccess();
  } catch (error) {
    errorHandler(error, createProjectFailure);
  }
};

export default createNewProject;
