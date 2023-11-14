import {
  milestoneTransactionsServiceForClient,
  projectMilestonesService,
} from '../../services/projectMilestoneService';
import {
  applicationFeeService,
  makeMilestonePaymentService,
  spendingDetailService,
  upcomingPaymentsService,
} from '../../services/paymentDetailService';
import errorHandler from '../../utility/errorHandler';
import {
  milestoneListRequest,
  milestoneListSuccess,
  milestonePaymentFailure,
  milestonePaymentRequest,
  milestonePaymentSuccess,
  milestoneTransactionFailure,
  milestoneTransactionRequest,
  milestoneTransactionSuccess,
  paymentFeeFailure,
  paymentFeeRequest,
  paymentFeeSuccess,
  upcomingPaymentFailure,
  upcomingPaymentRequest,
  upcomingPaymentSuccess,
} from '../reducers/milestonePayment';

const getMilestonePaymentListing = (project_id, onSuccess) => async (dispatch) => {
  dispatch(milestoneListRequest());
  try {
    const res = await projectMilestonesService(project_id);
    dispatch(milestoneListSuccess(res.data.data));
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, milestonePaymentFailure);
  }
};

const makeMilestonePayment = (data, onSuccess) => async (dispatch) => {
  dispatch(milestonePaymentRequest());
  try {
    const res = await makeMilestonePaymentService(data);
    dispatch(milestonePaymentSuccess(res.data));
    onSuccess(res.data);
  } catch (error) {
    errorHandler(error, milestonePaymentFailure);
  }
};

const getApplicationFee = (onSuccess) => async (dispatch) => {
  dispatch(paymentFeeRequest());
  try {
    const res = await applicationFeeService();
    dispatch(paymentFeeSuccess());
    onSuccess(res.data);
  } catch (error) {
    errorHandler(error, paymentFeeFailure);
  }
};

const getMilestoneTransactions = (projectId, milestoneId) => async (dispatch) => {
  dispatch(milestoneTransactionRequest());
  try {
    const res = await milestoneTransactionsServiceForClient(projectId, milestoneId);
    dispatch(milestoneTransactionSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, milestoneTransactionFailure);
  }
};

const getDashboardPaymentSpending = (onSuccess) => async () => {
  try {
    const res = await spendingDetailService();
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error);
  }
};

const getDashboardUpcomingPayments = () => async (dispatch) => {
  dispatch(upcomingPaymentRequest());
  try {
    const res = await upcomingPaymentsService();
    dispatch(upcomingPaymentSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, upcomingPaymentFailure);
  }
};

export {
  getMilestonePaymentListing,
  makeMilestonePayment,
  getApplicationFee,
  getMilestoneTransactions,
  getDashboardPaymentSpending,
  getDashboardUpcomingPayments,
};
