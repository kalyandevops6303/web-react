import { checkBidService, createBidService, projectDetailsService } from '../../services/createBidServices';
import errorHandler from '../../utility/errorHandler';
import {
  checkBidFailure,
  checkBidRequest,
  checkBidSuccess,
  createBidFailure,
  createBidRequest,
  createBidSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
} from '../reducers/createBid';

const getCheckBid = (projectId, teamId, onNoBidFound, onBidFound) => async (dispatch) => {
  dispatch(checkBidRequest());
  try {
    const res = await checkBidService(projectId, teamId);
    if ('bid_id' in res.data.data) {
      onBidFound(res.data.data);
    } else {
      onNoBidFound();
    }
    dispatch(checkBidSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, checkBidFailure);
  }
};

const createBid = (projectId, bidType, teamId, onSuccess) => async (dispatch) => {
  dispatch(createBidRequest());
  try {
    const res = await createBidService(projectId, bidType, teamId);
    dispatch(createBidSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, createBidFailure);
  }
};

const getProjectDetails = (projectId) => async (dispatch) => {
  dispatch(projectDetailsRequest());
  try {
    const res = await projectDetailsService(projectId);
    dispatch(projectDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectDetailsFailure);
  }
};

export { getCheckBid, createBid, getProjectDetails };
