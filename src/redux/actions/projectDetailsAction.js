import {
  getBidDetailsService,
  getCommonBidDetailsService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  projectDetailsService,
  updateBidStatusService,
} from '../../services/projectDetailsServices';
import errorHandler from '../../utility/errorHandler';
import {
  getBidInfoFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getReceivedBidsFailure,
  getReceivedBidsRequest,
  getReceivedBidsSuccess,
  getTeamMemberFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
} from '../reducers/projectDetails';

const getProjectDetails = (projectId) => async (dispatch) => {
  dispatch(projectDetailsRequest());
  try {
    const res = await projectDetailsService(projectId);
    dispatch(projectDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectDetailsFailure);
  }
};

const getTeamMembers =
  ({ project_id }) =>
  async (dispatch) => {
    dispatch(getTeamMemberRequest());
    try {
      const res = await getProjectTeamMemberServive({ project_id });
      dispatch(getTeamMemberSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getTeamMemberFailure);
    }
  };

const getReceivedBids =
  ({ project_id, metadata, search_text, bid_status }) =>
  async (dispatch) => {
    dispatch(getReceivedBidsRequest());
    try {
      const res = await getReceivedBidsService({ project_id, metadata, search_text, bid_status });
      dispatch(getReceivedBidsSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getReceivedBidsFailure);
    }
  };

const getBidDetails =
  ({ project_id, bid_id }) =>
  async (dispatch) => {
    dispatch(getBidInfoRequest());
    try {
      let res;
      if (bid_id) {
        res = await getBidDetailsService({ bid_id });
      } else {
        res = await getCommonBidDetailsService({ project_id });
      }
      dispatch(getBidInfoSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getBidInfoFailure);
    }
  };

const updateBidStatus =
  ({ bid_id, assign, onSuccess, onError }) =>
  async () => {
    try {
      await updateBidStatusService({ bid_id, assign });
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };
// eslint-disable-next-line import/prefer-default-export
export { getProjectDetails, updateBidStatus, getTeamMembers, getReceivedBids, getBidDetails };
