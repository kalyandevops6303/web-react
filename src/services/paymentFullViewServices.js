import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const paymentMetricsService = () => DataService.get(API.paymentFullView.paymentMetrics);

const paymentHistoryService = (page, pageSize) =>
  DataService.post(`${API.paymentFullView.paymentHistory}?page=${page}&page_size=${pageSize}`);

export { paymentMetricsService, paymentHistoryService };
