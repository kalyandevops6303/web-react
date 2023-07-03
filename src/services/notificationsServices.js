import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getNotificationsService = (priority, page, pageSize) => {
  if (priority === '') {
    return DataService.get(`${API.notifications.allNotifications}?page=${page}&page_size=${pageSize}`);
    // eslint-disable-next-line no-else-return
  } else {
    return DataService.get(
      `${API.notifications.allNotifications}?priority_filter=${priority}&page=${page}&page_size=${pageSize}`,
    );
  }
};

export default getNotificationsService;
