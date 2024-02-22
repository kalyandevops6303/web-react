import errorHandler from '../../utility/errorHandler';
import { milestoneDetailFailure, milestoneDetailRequest, milestoneDetailSuccess } from '../reducers/milestone';
import { milestoneDetailService } from '../../services/projectMilestoneService';

const getMilestoneDetail =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch(milestoneDetailRequest());
    try {
      const res = await milestoneDetailService(projectId);
      dispatch(milestoneDetailSuccess(res.data.data?.[0]));
    } catch (error) {
      errorHandler(error, milestoneDetailFailure);
    }
  };

// eslint-disable-next-line import/prefer-default-export
export { getMilestoneDetail };
