import {
  deleteRequestService,
  getRequestsService,
  getSupportCount,
  createSupportService,
} from '../../services/supportServices';
import errorHandler from '../../utility/errorHandler';
import {
  deleteRequestFailure,
  deleteRequestInitiate,
  deleteRequestSuccess,
  getSupportCountFailure,
  getSupportCountRequest,
  getSupportCountSuccess,
  supportFailure,
  supportListFailure,
  supportListRequest,
  supportListSuccess,
  supportRequest,
  supportSuccess,
} from '../reducers/support';

const customerSupport =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(supportRequest());
    try {
      const res = await createSupportService(data);
      dispatch(supportSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      errorHandler(error, supportFailure);
    }
  };

const getCustomerSupportCount = () => async (dispatch) => {
  dispatch(getSupportCountRequest());
  try {
    const res = await getSupportCount();
    dispatch(getSupportCountSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, getSupportCountFailure);
  }
};

const getCustomerSupportList =
  ({ data }) =>
  async (dispatch) => {
    dispatch(supportListRequest());
    try {
      const res = await getRequestsService(data);
      dispatch(supportListSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, supportListFailure);
    }
  };

const deleteRequest =
  ({ data }) =>
  async (dispatch) => {
    dispatch(deleteRequestInitiate());
    try {
      await deleteRequestService(data);
      dispatch(deleteRequestSuccess());
    } catch (error) {
      errorHandler(error, deleteRequestFailure);
    }
  };

export { customerSupport, getCustomerSupportCount, getCustomerSupportList, deleteRequest };
