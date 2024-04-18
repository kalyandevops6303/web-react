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
  milestoneDisputeFailure,
  milestoneDisputeRequest,
  milestoneDisputeSuccess,
  submissionHistoryFailure,
  submissionHistoryRequest,
  submissionHistorySuccess,
  submitMilestoneFailure,
  submitMilestoneRequest,
  submitMilestoneSuccess,
} from '../reducers/milestone';
import {
  getMilestoneDisputesService,
  getSubmissionHistoryService,
  markCompelteService,
  milestoneDetailService,
  submitMilestoneService,
} from '../../services/projectMilestoneService';
import { transferFundService } from '../../services/paymentDetailService';

import { scanAndProcessFiles } from '../../utility/Utils';

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

const getMilestoneDisputes =
  ({ milestoneId, metaData, projectId }) =>
  async (dispatch) => {
    if (metaData?.page === 1) {
      dispatch(milestoneDisputeRequest());
    }
    try {
      const res = await getMilestoneDisputesService({ milestoneId, metaData, projectId });
      dispatch(milestoneDisputeSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, milestoneDisputeFailure);
    }
  };

const submitMilstone =
  ({ milestone_id, data, onSuccess }) =>
  async (dispatch) => {
    dispatch(submitMilestoneRequest());
    try {
      const handleSubmitMilestone = async () => {
        await submitMilestoneService({ milestone_id, data });
        dispatch(submitMilestoneSuccess());
        dispatch(getSubmissionHistory({ milestoneId: milestone_id, metaData: { page: 1, page_size: 10 } }));
        onSuccess();
      };
      const file_keys = data?.documents?.map((file) => ({
        file_key: file.file_key,
        file_name: file.file_name,
      }));
      if (data?.documents?.length > 0) {
        scanAndProcessFiles({
          fileData: file_keys,
          handleMainAPI: handleSubmitMilestone,
          onError: () => dispatch(submitMilestoneFailure()),
          isPrivate: true,
        });
      } else {
        handleSubmitMilestone();
      }
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

export {
  getMilestoneDetail,
  getMilestoneDisputes,
  submitMilstone,
  markComplete,
  getSubmissionHistory,
  accpetMilestone,
};
