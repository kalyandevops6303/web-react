import errorHandler from '../../utility/errorHandler';
import {
  notificationsPollingFailure,
  notificationsFailure,
  notificationsPollingRequest,
  notificationsPollingSuccess,
  notificationsRequest,
  notificationsSuccess,
  markNotificationAsReadRequest,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
  markAllNotificationAsReadRequest,
  markAllNotificationAsReadSuccess,
  markAllNotificationAsReadFailure,
} from '../reducers/notifications';
import {
  getNotificationsService,
  getAlertsNotificationsService,
  getNotificationsPollingService,
  markNotificationAsReadService,
  markAllNotificationAsReadService,
} from '../../services/notificationsServices';

const getNotifications =
  ({ priority, page, pageSize, oldData }) =>
  async (dispatch) => {
    if (page === 1) {
      dispatch(notificationsRequest());
    }
    try {
      const res = await getNotificationsService(priority, page, pageSize);
      dispatch(notificationsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
    } catch (error) {
      errorHandler(error, notificationsFailure);
    }
  };

const getAlertsNotifications =
  ({ priority, page, pageSize, oldData }) =>
  async (dispatch) => {
    if (page === 1) {
      dispatch(notificationsRequest());
    }
    try {
      const res = await getAlertsNotificationsService(priority, page, pageSize);
      dispatch(notificationsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
    } catch (error) {
      errorHandler(error, notificationsFailure);
    }
  };

const getNotificationsPolling = () => async (dispatch) => {
  dispatch(notificationsPollingRequest());
  try {
    const res = await getNotificationsPollingService();
    dispatch(notificationsPollingSuccess(res.data.data));
  } catch (error) {
    // Failing silently considering that this would also be called for user that doesn't exist
    // errorHandler(error, notificationsPollingFailure);
  }
};

const markNotificationAsRead = (notificationId) => async (dispatch) => {
  dispatch(markNotificationAsReadRequest());
  try {
    const res = await markNotificationAsReadService(notificationId);
    dispatch(markNotificationAsReadSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, markNotificationAsReadFailure);
  }
};

const markAllNotificationAsRead = (onSuccess) => async (dispatch) => {
  dispatch(markAllNotificationAsReadRequest());
  try {
    const res = await markAllNotificationAsReadService();
    dispatch(markAllNotificationAsReadSuccess(res.data.data));
    onSuccess(res);
  } catch (error) {
    errorHandler(error, markAllNotificationAsReadFailure);
  }
};

export {
  getNotifications,
  getAlertsNotifications,
  getNotificationsPolling,
  markNotificationAsRead,
  markAllNotificationAsRead,
};
