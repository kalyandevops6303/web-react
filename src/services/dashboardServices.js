import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDataService = () => DataService.get(API.dashboard.userData);

export default userDataService;
