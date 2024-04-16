import errorHandler from '../../utility/errorHandler';
import {
  acceptDisputeFailure,
  acceptDisputeRequest,
  acceptDisputeSuccess,
  allDisputesFailure,
  allDisputesRequest,
  allDisputesSuccess,
  disputeRepliesFailure,
  disputeRepliesRequest,
  disputeRepliesSuccess,
  disputesCountFailure,
  disputesCountRequest,
  disputesCountSuccess,
  raiseDisputeFailure,
  raiseDisputeRequest,
  raiseDisputeSuccess,
  replyOnDisputeFailure,
  replyOnDisputeRequest,
  replyOnDisputeSuccess,
  resolveDisputeFailure,
  resolveDisputeRequest,
  resolveDisputeSuccess,
} from '../reducers/dispute';
import {
  acceptDisputeService,
  allDisputesService,
  disputeRepliesService,
  disputesCountService,
  raiseDisputeService,
  replyOnDisputeService,
  resolveDisputeService,
} from '../../services/disputeServices';
import { scanAndProcessFiles } from '../../utility/Utils';

const raiseNewDispute = (data, onSuccess) => async (dispatch) => {
  dispatch(raiseDisputeRequest());
  try {
    const res = await raiseDisputeService(data);
    dispatch(raiseDisputeSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, raiseDisputeFailure);
  }
};

const getAllDisputes = (type, page, pageSize, oldData) => async (dispatch) => {
  if (page === 1) {
    dispatch(allDisputesRequest());
  }
  try {
    const res = await allDisputesService(type, page, pageSize);
    dispatch(allDisputesSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, allDisputesFailure);
  }
};

const acceptDisputeApi = (disputeId, onSuccess) => async (dispatch) => {
  dispatch(acceptDisputeRequest());
  try {
    const res = await acceptDisputeService(disputeId);
    dispatch(acceptDisputeSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, acceptDisputeFailure);
  }
};

const replyOnDisputeApi = (data, onSuccess) => async (dispatch) => {
  dispatch(replyOnDisputeRequest());
  try {
    const callMainAPI = async () => {
      const res = await replyOnDisputeService(data);
      dispatch(replyOnDisputeSuccess(res.data.data));
      onSuccess();
    };
    if (data?.documents) {
      scanAndProcessFiles({
        fileData: data?.documents,
        handleMainAPI: callMainAPI,
        onError: () => dispatch(replyOnDisputeFailure()),
        isPrivate: true,
      });
    } else {
      callMainAPI();
    }
  } catch (error) {
    errorHandler(error, replyOnDisputeFailure);
  }
};

const getDisputeReplies = (disputeId, page, pageSize, oldData) => async (dispatch) => {
  dispatch(disputeRepliesRequest());
  try {
    const res = await disputeRepliesService(disputeId, page, pageSize);
    dispatch(disputeRepliesSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, disputeRepliesFailure);
  }
};

const resolveDisputeApi = (disputeId, onSuccess) => async (dispatch) => {
  dispatch(resolveDisputeRequest());
  try {
    const res = await resolveDisputeService(disputeId);
    dispatch(resolveDisputeSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, resolveDisputeFailure);
  }
};

const getDisputesCount = () => async (dispatch) => {
  dispatch(disputesCountRequest());
  try {
    const res = await disputesCountService();
    dispatch(disputesCountSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, disputesCountFailure);
  }
};

export {
  raiseNewDispute,
  getAllDisputes,
  acceptDisputeApi,
  replyOnDisputeApi,
  getDisputeReplies,
  resolveDisputeApi,
  getDisputesCount,
};
