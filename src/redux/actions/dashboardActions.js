import errorHandler from '../../utility/errorHandler';
import {
  userDataService,
  recommendedProjectsService,
  profilePercentageService,
  getProjectInviteService,
} from '../../services/dashboardServices';
import {
  getProjectInvitesSuccess,
  profilePercentageFailure,
  profilePercentageRequest,
  profilePercentageSuccess,
  recommendedProjectsFailure,
  recommendedProjectsRequest,
  recommendedProjectsSuccess,
  userDataFailure,
  userDataRequest,
  userDataSuccess,
} from '../reducers/dashboard';
import { setItem } from '../../utility/localStorageControl';

const getUserData = () => async (dispatch) => {
  dispatch(userDataRequest());
  try {
    const res = await userDataService();
    dispatch(userDataSuccess(res.data.data));
    setItem('userData', res.data.data);
  } catch (error) {
    errorHandler(error, userDataFailure);
  }
};

const getRecommendedProjects = () => async (dispatch) => {
  dispatch(recommendedProjectsRequest());
  try {
    const res = await recommendedProjectsService();
    dispatch(recommendedProjectsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, recommendedProjectsFailure);
  }
};

const getProfilePercentage = () => async (dispatch) => {
  dispatch(profilePercentageRequest());
  try {
    const res = await profilePercentageService();
    dispatch(profilePercentageSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, profilePercentageFailure);
  }
};

const getProjectInvites = () => async (dispatch) => {
  try {
    const res = await getProjectInviteService();
    dispatch(getProjectInvitesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error);
  }
};

export { getUserData, getRecommendedProjects, getProfilePercentage, getProjectInvites };
