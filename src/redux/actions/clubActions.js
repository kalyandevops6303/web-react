import { registerClubEmailService } from '../../services/clubServices';
import { createTeamService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import {
  getClubCreated,
  registerClubEmailFailure,
  registerClubEmailRequest,
  registerClubEmailSuccess,
  setClubCreateData,
} from '../reducers/clubs';

const setClubCreateDataAction = (data) => async (dispatch) => {
  dispatch(setClubCreateData(data));
};

const registerClubEmail =
  ({ email, onSuccess }) =>
  async (dispatch) => {
    dispatch(registerClubEmailRequest());
    try {
      await registerClubEmailService(email);
      dispatch(registerClubEmailSuccess(email));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, registerClubEmailFailure);
    }
  };

const createClub =
  ({ data, onSuccess }) =>
  async (dispatch) => {
    try {
      const res = await createTeamService(data);
      dispatch(getClubCreated(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      errorHandler(error);
    }
  };

export { setClubCreateDataAction, registerClubEmail, createClub };
