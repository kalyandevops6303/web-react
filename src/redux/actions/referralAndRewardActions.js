import errorHandler from '../../utility/errorHandler';
import { createReferralFailure, createReferralRequest, createReferralSuccess } from '../reducers/referralAndReward';
import { createReferralService } from '../../services/referralAndRewardServices';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const createNewReferral = (data, onSuccess) => async (dispatch) => {
  dispatch(createReferralRequest());
  try {
    const res = await createReferralService(data);
    dispatch(createReferralSuccess(res.data.data));
    onSuccess();
    ShowToastMessage(SUCCESS, res.data.data);
  } catch (error) {
    errorHandler(error, createReferralFailure);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createNewReferral };
