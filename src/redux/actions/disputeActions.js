import errorHandler from '../../utility/errorHandler';
import {
  acceptDisputeFailure,
  acceptDisputeRequest,
  acceptDisputeSuccess,
  allDisputesFailure,
  allDisputesRequest,
  allDisputesSuccess,
  raiseDisputeFailure,
  raiseDisputeRequest,
  raiseDisputeSuccess,
  replyOnDisputeFailure,
  replyOnDisputeRequest,
  replyOnDisputeSuccess,
} from '../reducers/dispute';
import {
  acceptDisputeService,
  allDisputesService,
  raiseDisputeService,
  replyOnDisputeService,
} from '../../services/disputeServices';

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

const getAllDisputes = (page, pageSize, oldData) => async (dispatch) => {
  dispatch(allDisputesRequest());
  try {
    const res = await allDisputesService(page, pageSize);
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
    const res = await replyOnDisputeService(data);
    dispatch(replyOnDisputeSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, replyOnDisputeFailure);
  }
};

export { raiseNewDispute, getAllDisputes, acceptDisputeApi, replyOnDisputeApi };
