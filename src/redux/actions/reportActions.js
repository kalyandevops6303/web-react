import { reportEntityService } from '../../services/dashboardServices';
import errorHandler from '../../utility/errorHandler';
import { reportFailure, reportRequest, reportSuccess } from '../reducers/report';

const reportEntity =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    dispatch(reportRequest());
    try {
      const res = await reportEntityService(data);
      dispatch(reportSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      errorHandler(error, reportFailure);
    }
  };

export { reportEntity };
