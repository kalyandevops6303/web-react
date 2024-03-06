import errorHandler from '../../utility/errorHandler';
import {
  acceptMilestoneFailure,
  acceptMilestoneRequest,
  acceptMilestoneSuccess,
  markCompelteFailure,
  markCompelteRequest,
  markCompelteSuccess,
  milestoneDetailFailure,
  milestoneDetailRequest,
  milestoneDetailSuccess,
  submissionHistoryFailure,
  submissionHistoryRequest,
  submissionHistorySuccess,
  submitMilestoneFailure,
  submitMilestoneRequest,
  submitMilestoneSuccess,
} from '../reducers/milestone';
import {
  getSubmissionHistoryService,
  markCompelteService,
  milestoneDetailService,
  submitMilestoneService,
} from '../../services/projectMilestoneService';
import { transferFundService } from '../../services/paymentDetailService';

const getMilestoneDetail =
  ({ milestoneId }) =>
  async (dispatch) => {
    dispatch(milestoneDetailRequest());
    try {
      const res = await milestoneDetailService(milestoneId);
      dispatch(milestoneDetailSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, milestoneDetailFailure);
    }
  };
const getSubmissionHistory =
  ({ milestoneId, metaData }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(submissionHistoryRequest());
    }
    try {
      const res = await getSubmissionHistoryService({ milestoneId, metaData });
      dispatch(submissionHistorySuccess(res.data.data));
    } catch (error) {
      errorHandler(error, submissionHistoryFailure);
    }
  };
const submitMilstone =
  ({ milestone_id, data, onSuccess }) =>
  async (dispatch) => {
    dispatch(submitMilestoneRequest());
    try {
      await submitMilestoneService({ milestone_id, data });
      dispatch(submitMilestoneSuccess());
      dispatch(getSubmissionHistory({ milestoneId: milestone_id, metaData: { page: 1, page_size: 10 } }));
      onSuccess();
    } catch (error) {
      errorHandler(error, submitMilestoneFailure);
    }
  };

const accpetMilestone =
  ({ milestoneId, onSuccess }) =>
  async (dispatch) => {
    dispatch(acceptMilestoneRequest());
    try {
      await transferFundService({ milestone: milestoneId });
      dispatch(acceptMilestoneSuccess());
      dispatch(getMilestoneDetail({ milestoneId }));
      onSuccess();
    } catch (error) {
      errorHandler(error, acceptMilestoneFailure);
    }
  };

const markComplete =
  ({ milestoneId, onSuccess }) =>
  async (dispatch) => {
    dispatch(markCompelteRequest());
    try {
      await markCompelteService(milestoneId);
      dispatch(markCompelteSuccess());
      dispatch(getMilestoneDetail({ milestoneId }));
      onSuccess();
    } catch (error) {
      errorHandler(error, markCompelteFailure);
    }
  };

export { getMilestoneDetail, submitMilstone, markComplete, getSubmissionHistory, accpetMilestone };
