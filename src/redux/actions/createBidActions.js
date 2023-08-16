import {
  bidDetailsService,
  checkBidService,
  createBidService,
  projectDetailsService,
  rolesService,
} from '../../services/createBidServices';
import errorHandler from '../../utility/errorHandler';
import {
  bidDetailsFailure,
  bidDetailsRequest,
  bidDetailsSuccess,
  checkBidFailure,
  checkBidRequest,
  checkBidSuccess,
  createBidFailure,
  createBidRequest,
  createBidSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  rolesFailure,
  rolesRequest,
  rolesSuccess,
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

const getBidDetails = (bidId, teamId) => async (dispatch) => {
  dispatch(bidDetailsRequest());
  try {
    const res = await bidDetailsService(bidId, teamId);
    dispatch(bidDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, bidDetailsFailure);
  }
};

const getRoles = (projectId, teamId) => async (dispatch) => {
  dispatch(rolesRequest());
  try {
    const res = await rolesService(projectId, teamId);
    dispatch(rolesSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, rolesFailure);
  }
};

export { getCheckBid, createBid, getProjectDetails, getBidDetails, getRoles };
