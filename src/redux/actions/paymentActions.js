import errorHandler from '../../utility/errorHandler';
import { paymentDetailsSuccess, paymentDetailsFailure, paymentDetailsRequest } from '../reducers/paymentDetails';
import {
  createUserService,
  updateUserService,
  setupStripeAccountService,
  getPaymentDetailService,
} from '../../services/paymentDetailService';

const getPaymentDetails = (onGetPaymentDetailsSuccess) => async (dispatch) => {
  dispatch(paymentDetailsRequest());
  try {
    const res = await getPaymentDetailService();
    onGetPaymentDetailsSuccess(res.data.data);
    dispatch(paymentDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, paymentDetailsFailure);
  }
};

const savePaymentDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(paymentDetailsRequest());
  try {
    const res = await createUserService(data);
    dispatch(paymentDetailsSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, paymentDetailsFailure);
  }
};

const updatePaymentDetails = (data, onSuccess) => async (dispatch) => {
  dispatch(paymentDetailsRequest());
  try {
    const res = await updateUserService(data);
    dispatch(paymentDetailsSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, paymentDetailsFailure);
  }
};

const setupStripeAccount = (data, onSuccess) => async (dispatch) => {
  try {
    const res = await setupStripeAccountService(data);
    dispatch(paymentDetailsSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, paymentDetailsFailure);
  }
};

export { savePaymentDetails, updatePaymentDetails, setupStripeAccount, getPaymentDetails };
