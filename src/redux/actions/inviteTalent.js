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
  favoriteTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  inviteTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
} from '../reducers/createProject';
import {
  almaMaterTalentsService,
  bestTalentsService,
  favoriteTalentsService,
  inviteTalentsService,
} from '../../services/createProjectServices';

const getBestTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(bestTalentsRequest());
  try {
    const res = await bestTalentsService(projectId, searchText, page, pageSize);
    dispatch(bestTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, bestTalentsFailure);
  }
};

const getFavoriteTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(favoriteTalentsRequest());
  try {
    const res = await favoriteTalentsService(projectId, searchText, page, pageSize);
    dispatch(favoriteTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, favoriteTalentsFailure);
  }
};

const getAlmaMaterTalents = (projectId, searchText, page, pageSize, oldData) => async (dispatch) => {
  dispatch(almaMaterTalentsRequest());
  try {
    const res = await almaMaterTalentsService(projectId, searchText, page, pageSize);
    dispatch(almaMaterTalentsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, almaMaterTalentsFailure);
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

export { getBestTalents, getFavoriteTalents, getAlmaMaterTalents, inviteTalents };
