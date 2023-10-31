import { projectMilestonesService } from '../../services/projectMilestoneService';
import { makeMilestonePaymentService } from '../../services/paymentDetailService';
import errorHandler from '../../utility/errorHandler';
import {
  milestoneListRequest,
  milestoneListSuccess,
  milestonePaymentFailure,
  milestonePaymentRequest,
  milestonePaymentSuccess,
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

export { getMilestonePaymentListing, makeMilestonePayment };
