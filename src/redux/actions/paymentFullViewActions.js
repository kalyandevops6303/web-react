import { paymentHistoryService, paymentMetricsService } from '../../services/paymentFullViewServices';
import errorHandler from '../../utility/errorHandler';
import {
  paymentHistoryFailure,
  paymentHistoryRequest,
  paymentHistorySuccess,
  paymentMetricsFailure,
  paymentMetricsRequest,
  paymentMetricsSuccess,
} from '../reducers/paymentFullView';

const getPaymentMetrics = () => async (dispatch) => {
  dispatch(paymentMetricsRequest());
  try {
    const res = await paymentMetricsService();
    dispatch(paymentMetricsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, paymentMetricsFailure);
  }
};

const getPaymentHistory =
  ({ page, pageSize, oldData, filters }) =>
  async (dispatch) => {
    if (page === 1) {
      dispatch(paymentHistoryRequest());
    }
    try {
      const res = await paymentHistoryService(page, pageSize, filters);
      dispatch(paymentHistorySuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
    } catch (error) {
      errorHandler(error, paymentHistoryFailure);
    }
  };

export { getPaymentMetrics, getPaymentHistory };
