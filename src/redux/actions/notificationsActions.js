import errorHandler from '../../utility/errorHandler';
import { notificationsFailure, notificationsRequest, notificationsSuccess } from '../reducers/notifications';
import { getNotificationsService, getAlertsNotificationsService } from '../../services/notificationsServices';

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

export { getNotifications, getAlertsNotifications };
