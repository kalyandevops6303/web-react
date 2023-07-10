/* eslint-disable no-undef */
// import { logOut } from '../redux/authentication/actionCreator';
import ShowToastMessage from '../@core/components/toast';
import store from '../redux/store';
import { ERROR } from './constants/ToastTypes';

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

const handleErrorCode = (err, callBack) => {
  if (callBack) {
    dispatch(callBack(err));
  }
  showErrorNotification(err?.response?.data?.errorData?.message || 'Operation could not be completed');
};

const handleError = (err, callBack) => {
  if (window.navigator.onLine) {
    handleErrorCode(err, callBack);
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
      handleError(err, callBack);
    }
  }
};
export default errorHandler;
