/* eslint-disable no-undef */
import ShowToastMessage from '../@core/components/toast';
// eslint-disable-next-line import/no-cycle
import { logoutAction } from '../redux/actions/authActions';
import { store } from '../redux/store';
import { ERROR } from './constants/ToastTypes';
import { getItem } from './localStorageControl';

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
const handleErrorCode = (err, callBack) => {
  if (window.navigator.onLine) {
    if (err?.response?.status === 401) {
      showErrorNotification('Session expired!');
      setTimeout(() => {
        const onSuccess = () => {
          window.location.href = '/auth/login';
        };
        dispatch(logoutAction({ fcmToken, onSuccess }));
      }, 500);
    } else {
      handleError(err, callBack);
    }
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
      ShowToastMessage(ERROR, 'Unable to process request');
      if (callBack) {
        dispatch(callBack(err));
      }
    } else {
      handleErrorCode(err, callBack);
    }
  } else {
    showErrorNotification('Please check your connection!');
  }
};
export default errorHandler;
