import { delegateSignUpService, inviteDelegateService } from '../../services/delegateServices';
import errorHandler from '../../utility/errorHandler';
import {
  inviteDelegateFailure,
  inviteDelegateRequest,
  inviteDelegateSuccess,
  signUpDelegateRequest,
  signUpDelegateSuccess,
} from '../reducers/delegate';
import { setItem } from '../../utility/localStorageControl';

const signUpDelegate =
  ({ email, password, onSuccess }) =>
  async (dispatch) => {
    dispatch(signUpDelegateRequest());
    try {
      const res = await delegateSignUpService(email, password);
      setItem('access_token', res.data.data.access_token);
      setItem('access_token_expires', res.data.data.access_token_expires);
      setItem('refresh_token', res.data.data.refresh_token);
      setItem('refresh_token_expires', res.data.data.refresh_token_expires);
      setItem('user_id', res.data.data.user_id);
      window.dataLayer.push({ user_id: res.data.data.user_id });
      onSuccess(res.data.data);
      dispatch(signUpDelegateSuccess(res));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, inviteDelegateFailure);
    }
  };

const inviteDelegate =
  ({ email, onSuccess }) =>
  async (dispatch) => {
    dispatch(inviteDelegateRequest());
    try {
      const res = await inviteDelegateService(email);
      dispatch(inviteDelegateSuccess(res));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, inviteDelegateFailure);
    }
  };

export { inviteDelegate, signUpDelegate };
