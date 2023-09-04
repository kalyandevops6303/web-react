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
} from '../reducers/dispute';
import { acceptDisputeService, allDisputesService, raiseDisputeService } from '../../services/disputeServices';

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

export { raiseNewDispute, getAllDisputes, acceptDisputeApi };
