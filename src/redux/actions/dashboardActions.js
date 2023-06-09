import errorHandler from '../../utility/errorHandler';
import userDataService from '../../services/dashboardServices';
import { userDataFailure, userDataRequest, userDataSuccess } from '../reducers/dashboard';
import { setItem } from '../../utility/localStorageControl';

const getUserData = () => async (dispatch) => {
  dispatch(userDataRequest());
  try {
    const res = await userDataService();
    dispatch(userDataSuccess(res.data.data));
    setItem('userData', res.data.data);
  } catch (error) {
    errorHandler(error, userDataFailure);
  }
};

export default getUserData;
