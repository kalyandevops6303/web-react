import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getPaymentDetailService = () => DataService.get(API.payment.taxInfo);
const createUserService = (data) => DataService.post(API.payment.taxInfo, data);
const updateUserService = (data) => DataService.put(API.payment.taxInfo, data);
const setupStripeAccountService = (data) => DataService.post(API.payment.paymentAccount, data);

export { createUserService, updateUserService, setupStripeAccountService, getPaymentDetailService };
