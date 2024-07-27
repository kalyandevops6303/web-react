import { delegateSignUpService, inviteDelegateService } from '../../services/delegateServices';
import errorHandler from '../../utility/errorHandler';
import {
  inviteDelegateFailure,
  inviteDelegateRequest,
  inviteDelegateSuccess,
  signInDelegateSuccess,
  signUpDelegateRequest,
  signUpDelegateSuccess,
} from '../reducers/delegate';
import { setItem } from '../../utility/localStorageControl';
import { checkPoints } from '../../utility/constants/Constant';
import { setItemFromSession } from '../../utility/sessesionStorageControl';
import { loginService } from '../../services/authServices';

const signUpDelegate =
  ({ email, password, onSuccess }) =>
  async (dispatch) => {
    dispatch(signUpDelegateRequest());
    try {
      const res = await delegateSignUpService({ email, password });
      setItem('access_token', res.data.data.access_token);
      setItem('access_token_expires', res.data.data.access_token_expires);
      setItem('refresh_token', res.data.data.refresh_token);
      setItem('refresh_token_expires', res.data.data.refresh_token_expires);
      setItem('user_id', res.data.data.user_id);
      setItem('user_type', res.data.data.user_type);
      window.dataLayer.push({ user_id: res.data.data.user_id });
      if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
        dispatch(signUpDelegateSuccess(res.data.data));
        setItemFromSession('isUserVisited', true);
      } else {
        dispatch(signUpDelegateSuccess(false));
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, inviteDelegateFailure);
    }
  };

const signInDelegate =
  ({ email, password, onSuccess }) =>
  async (dispatch) => {
    dispatch(signUpDelegateRequest());
    try {
      const res = await loginService({ email, password });
      setItem('access_token', res.data.data.access_token);
      setItem('access_token_expires', res.data.data.access_token_expires);
      setItem('refresh_token', res.data.data.refresh_token);
      setItem('refresh_token_expires', res.data.data.refresh_token_expires);
      setItem('user_id', res.data.data.user_id);
      setItem('is_delegate', res.data.data.is_delegate);
      setItem('user_type', res.data.data.user_type);
      window.dataLayer.push({ user_id: res.data.data.user_id });
      if (res.data?.data?.checkpoint === checkPoints.COMPLETE) {
        dispatch(signInDelegateSuccess(res.data.data));
        setItemFromSession('isUserVisited', true);
      } else {
        dispatch(signInDelegateSuccess(false));
      }
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
      await inviteDelegateService({ email });
      dispatch(inviteDelegateSuccess());
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, inviteDelegateFailure);
    }
  };

const delegateInvitationStatus =
  ({ onSuccess }) =>
  async (dispatch) => {
    dispatch(inviteDelegateRequest());
    try {
      const res = await inviteDelegateService();
      dispatch(inviteDelegateSuccess(res));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      errorHandler(error, inviteDelegateFailure);
    }
  };

export { inviteDelegate, signUpDelegate, signInDelegate, delegateInvitationStatus };
