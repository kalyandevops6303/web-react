import errorHandler from '../../utility/errorHandler';
import {
  milestoneDetailFailure,
  milestoneDetailRequest,
  milestoneDetailSuccess,
  submissionHistoryFailure,
  submissionHistoryRequest,
  submissionHistorySuccess,
} from '../reducers/milestone';
import { getSubmissionHistoryService, milestoneDetailService } from '../../services/projectMilestoneService';

const getMilestoneDetail =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch(milestoneDetailRequest());
    try {
      const res = await milestoneDetailService(projectId);
      dispatch(milestoneDetailSuccess(res.data.data?.[0]));
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

export { getMilestoneDetail, getSubmissionHistory };
