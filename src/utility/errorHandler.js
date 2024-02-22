/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
import { CometChat } from '@cometchat-pro/chat';
import ShowToastMessage from '../@core/components/toast';
import { switchProfile } from '../redux/actions/authActions';
import { userDataSuccess } from '../redux/reducers/auth';
import { removeTeamFromList } from '../redux/reducers/team';
import { store } from '../redux/store';
import { fcmUnsubscribeService } from '../services/authServices';
import { ERROR_CODES } from './constants/Constant';
import { ERROR } from './constants/ToastTypes';
import { getItem } from './localStorageControl';
import { getItemFromSession, setItemFromSession } from './sessesionStorageControl';
import { messaging } from '../configs/api/firebase';

const { dispatch } = store;

const MIN_ERROR_INTERVAL_MS = 5000; // Minimum time between error notifications (in milliseconds)

let lastErrorTime = 0; // Timestamp of the last error notification

const showErrorNotification = (errorMessage) => {
  const currentTime = Date.now();
  if (currentTime - lastErrorTime >= MIN_ERROR_INTERVAL_MS) {
    ShowToastMessage(ERROR, errorMessage);
    lastErrorTime = currentTime;
  }
};

const handleError = (err, callBack) => {
  if (callBack) {
    dispatch(callBack(err));
  }
  showErrorNotification(err?.response?.data?.errorData?.message || 'Operation could not be completed');
};

const fcmToken = getItem('fcmToken');
const handleErrorCode = async (err, callBack) => {
  if (err?.response?.status === 401) {
    showErrorNotification('Session expired!');
    if (fcmToken) {
      try {
        await fcmUnsubscribeService(fcmToken);
      } catch (error) {
        console.error(error);
      }
    }
    await messaging.deleteToken();
    await CometChat.logout();
    const teamId = getItemFromSession('team_id');
    const teamData = getItemFromSession('team_data');
    window.location.href = '/auth/login';
    localStorage.clear();
    sessionStorage.clear();
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
    const userData = getItem('savedUserData');
    if (teamId) {
      dispatch(removeTeamFromList(teamId));
      dispatch(switchProfile({ data: userData, onSuccess: () => {}, selected: false }));
      showErrorNotification("You're no longer a team member");
      dispatch(userDataSuccess(userData));
    }
  } else {
    handleError(err, callBack);
  }
};

const errorHandler = (err, callBack) => {
  console.error(err);
  if (window.navigator.onLine) {
    if (
      err?.response?.status === 502 ||
      err?.response?.status === 500 ||
      err?.message === 'Network Error' ||
      err?.message === 'CORS error'
    ) {
      ShowToastMessage(ERROR, 'Unable to process request');
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
