import errorHandler from '../../utility/errorHandler';
import { raiseDisputeFailure, raiseDisputeRequest, raiseDisputeSuccess } from '../reducers/dispute';
import { raiseDisputeService } from '../../services/disputeServices';

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

// eslint-disable-next-line import/prefer-default-export
export { raiseNewDispute };
