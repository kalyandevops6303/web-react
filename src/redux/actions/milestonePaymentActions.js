import { projectMilestonesService } from '../../services/projectMilestoneService';
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

const paymentDetails = () => {};

export { getMilestonePaymentListing, paymentDetails };
