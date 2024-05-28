import { getSupportCount, supportServive } from '../../services/supportServices';
import errorHandler from '../../utility/errorHandler';
import {
  getSupportCountFailure,
  getSupportCountRequest,
  getSupportCountSuccess,
  supportFailure,
  supportRequest,
  supportSuccess,
} from '../reducers/support';

const customerSupport =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(supportRequest());
    try {
      const res = await supportServive(data);
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

export { customerSupport, getCustomerSupportCount };
