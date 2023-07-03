import errorHandler from '../../utility/errorHandler';
import { notificationsFailure, notificationsRequest, notificationsSuccess } from '../reducers/notifications';
import getNotificationsService from '../../services/notificationsServices';

const getNotifications = (priority, page, pageSize, oldData) => async (dispatch) => {
  dispatch(notificationsRequest());
  try {
    const res = await getNotificationsService(priority, page, pageSize);
    dispatch(notificationsSuccess({ ...res.data.data, data: [...oldData, ...res.data.data.data] }));
  } catch (error) {
    errorHandler(error, notificationsFailure);
  }
};

export default getNotifications;
