import toast from 'react-hot-toast';
import {
  milestoneTransactionsServiceForClient,
  milestoneTransactionsServiceForTeam,
  projectMilestonesService,
} from '../../services/projectMilestoneService';
import {
  applicationFeeService,
  makeMilestonePaymentService,
  spendingDetailService,
  upcomingPaymentsService,
  updatePaymentStatusService,
} from '../../services/paymentDetailService';
import errorHandler from '../../utility/errorHandler';
import {
  milestoneListFailure,
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
  updatePaymentStatusFailure,
  updatePaymentStatusRequest,
  updatePaymentStatusSuccess,
} from '../reducers/milestonePayment';
import { ERROR_CODES } from '../../utility/constants/Constant';

const getMilestonePaymentListing = (project_id, onSuccess) => async (dispatch) => {
  dispatch(milestoneListRequest());
  try {
    const res = await projectMilestonesService(project_id);
    dispatch(milestoneListSuccess(res.data.data));
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, milestoneListFailure);
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

const getApplicationFee = (projectId, onSuccess) => async (dispatch) => {
  dispatch(paymentFeeRequest());
  try {
    const res = await applicationFeeService(projectId);
    dispatch(paymentFeeSuccess());
    onSuccess(res.data);
  } catch (error) {
    errorHandler(error, paymentFeeFailure);
  }
};

const getMilestoneTransactions = (projectId, milestoneId, isClient) => async (dispatch) => {
  dispatch(milestoneTransactionRequest());
  let res = null;
  try {
    if (isClient) {
      res = await milestoneTransactionsServiceForClient(projectId, milestoneId);
      dispatch(milestoneTransactionSuccess(res.data.data));
    } else {
      res = await milestoneTransactionsServiceForTeam(projectId, milestoneId);
      dispatch(milestoneTransactionSuccess(res.data.data.my_payments));
    }
  } catch (error) {
    // As per requirement one talent must not be view transaction of other talent, since showing relevent toast message
    dispatch(milestoneTransactionFailure());
    if (error?.response?.data?.errorData?.errorCode === ERROR_CODES.EC_404) {
      toast.error('You are not part of this project team', {
        position: 'top-center',
      });
    }
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

const updatePaymentStatus = (data) => async (dispatch) => {
  dispatch(updatePaymentStatusRequest());
  try {
    await updatePaymentStatusService(data);
    setTimeout(() => {
      dispatch(updatePaymentStatusSuccess());
    }, 3000);
  } catch (error) {
    errorHandler(error, updatePaymentStatusFailure);
  }
};

export {
  getMilestonePaymentListing,
  makeMilestonePayment,
  getApplicationFee,
  getMilestoneTransactions,
  getDashboardPaymentSpending,
  getDashboardUpcomingPayments,
  updatePaymentStatus,
};
