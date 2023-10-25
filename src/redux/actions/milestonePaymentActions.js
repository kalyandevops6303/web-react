import { projectMilestonesService } from '../../services/projectMilestoneService';
import { makeMilestonePaymentService } from '../../services/paymentDetailService';
import errorHandler from '../../utility/errorHandler';
import {
  milestonePaymentFailure,
  milestonePaymentRequest,
  milestonePaymentSuccess,
} from '../reducers/milestonePayment';

const getMilestonePaymentListing = (project_id, onSuccess) => async (dispatch) => {
  dispatch(milestonePaymentRequest());
  try {
    const res = await projectMilestonesService(project_id);
    dispatch(milestonePaymentSuccess(res.data.data));
    onSuccess(res.data.data);
  } catch (error) {
    errorHandler(error, milestonePaymentFailure);
  }
};

const makeMilestonePayment = (data, onSuccess) => async (dispatch) => {
  dispatch(milestonePaymentRequest());
  try {
    const res = await makeMilestonePaymentService(data);
    dispatch(milestonePaymentSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, milestonePaymentFailure);
  }
};

export { getMilestonePaymentListing, makeMilestonePayment };
