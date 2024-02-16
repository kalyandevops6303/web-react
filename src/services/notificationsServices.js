import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getNotificationsService = (priority, page, pageSize) =>
  DataService.post(`${API.notifications.allNotifications}?page=${page}&page_size=${pageSize}`, {
    priorities: priority === 0 ? [] : [priority],
  });

const getAlertsNotificationsService = (priority, page, pageSize) =>
  DataService.post(`${API.notifications.allNotifications}?page=${page}&page_size=${pageSize}`, {
    priorities: priority,
  });

const getNotificationsPollingService = () => DataService.get(API.notifications.polling);

const markNotificationAsReadService = (notificationId) =>
  DataService.put(`${API.notifications.markAsRead}?notification_id=${notificationId}`);

export {
  getNotificationsService,
  getAlertsNotificationsService,
  getNotificationsPollingService,
  markNotificationAsReadService,
};
