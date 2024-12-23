/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
import { CometChat } from '@cometchat-pro/chat';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { switchProfile } from '../redux/actions/authActions';
import { userDataSuccess } from '../redux/reducers/auth';
import { removeTeamFromList } from '../redux/reducers/team';
import { store } from '../redux/store';
import { ERROR_CODES } from './constants/Constant';import { getItem, setItem } from './localStorageControl';
import { getItemFromSession, setItemFromSession } from './sessesionStorageControl';
import { messaging } from '../configs/api/firebase';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { isUserLoggedIn } from './commonUtils';

const { dispatch } = store;

const MIN_ERROR_INTERVAL_MS = 5000; // Minimum time between error notifications (in milliseconds)

let lastErrorTime = 0; // Timestamp of the last error notification

const showErrorNotification = (errorMessage) => {
  const currentTime = Date.now();
  if (currentTime - lastErrorTime >= MIN_ERROR_INTERVAL_MS) {
    showToastMessage(ToastType.ERROR, errorMessage);
    lastErrorTime = currentTime;
  }
};

const handleError = (err, callBack) => {
  if (callBack) {
    dispatch(callBack(err));
  }
  showErrorNotification(err?.response?.data?.errorData?.message || err?.message || 'Operation could not be completed');
};

const handleErrorCode = async (err, callBack) => {
  const cometChatToken = getItem('cometChatToken');
  const fcmToken = getItem('fcmToken');
  const expiredError = getItem('expiredError');
  if (err?.response?.status === 401) {
    if (!expiredError) {
      setItem('expiredError', true);
      if (isUserLoggedIn()) {
        showErrorNotification('Session expired!');
      }
      if (fcmToken) {
        try {
          // Not needed because access token is already expried and unsubscribed API need valid token
          // await fcmUnsubscribeService(fcmToken);
          await messaging?.deleteToken();
        } catch (error) {
          console.error(error);
        }
      }

      if (cometChatToken) {
        CometChat?.disconnect();
        await CometChat?.logout();
      }

      window.location.href = '/auth/login';
      localStorage.clear();
      sessionStorage.clear();
    }
    const teamId = getItemFromSession('team_id');
    const teamData = getItemFromSession('team_data');
    if (teamId) {
      setItemFromSession('redirect_to_location', window.location.pathname + window.location.search);
      setItemFromSession('team_id', teamId);
      setItemFromSession('team_data', teamData);
      setItemFromSession('isUserVisited', true);
    } else {
      setItemFromSession('redirect_to_location', window.location.pathname + window.location.search);
      setItemFromSession('isUserVisited', true);
    }
  } else if (
    err?.response?.status === ERROR_CODES.EC_404 &&
    err?.response?.data?.errorData?.message === "You're no longer a team member"
  ) {
    const teamId = getItemFromSession('team_id');
    if (teamId) {
      const currentState = store.getState();
      const userData = currentState.auth.savedUserData;
      dispatch(removeTeamFromList(teamId));
      dispatch(switchProfile({ data: userData, onSuccess: () => {}, selected: false }));
      showErrorNotification("You're no longer a team member");
      dispatch(userDataSuccess(userData));
    }
    handleError(err, callBack);
  } else {
    handleError(err, callBack);
  }
};

const errorHandler = (err, callBack) => {
  if (window.navigator.onLine) {
    if (
      err?.response?.status === 502 ||
      err?.response?.status === 500 ||
      err?.message === 'Network Error' ||
      err?.message === 'CORS error'
    ) {
      showToastMessage(ToastType.ERROR, 'Unable to process request');
      if (callBack) {
        dispatch(callBack(err));
      }
    } else {
      handleErrorCode(err, callBack);
    }
  } else {
    showErrorNotification('Please check your connection!');
    dispatch(callBack(err));
  }
};
export default errorHandler;
