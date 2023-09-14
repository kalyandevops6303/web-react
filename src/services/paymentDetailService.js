import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createUserService = (data) => DataService.post(API.payment.create, data);
const updateUserService = (data) => DataService.put(API.payment.create, data);

export { createUserService, updateUserService };
