import { projectDetailsService } from '../../services/projectDetailsServices';
import errorHandler from '../../utility/errorHandler';
import { projectDetailsFailure, projectDetailsRequest, projectDetailsSuccess } from '../reducers/projectDetails';

const getProjectDetails = (projectId) => async (dispatch) => {
  dispatch(projectDetailsRequest());
  try {
    const res = await projectDetailsService(projectId);
    dispatch(projectDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectDetailsFailure);
  }
};
// eslint-disable-next-line import/prefer-default-export
export { getProjectDetails };
