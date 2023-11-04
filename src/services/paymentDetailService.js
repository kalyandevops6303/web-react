import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getPaymentDetailService = () => DataService.get(API.payment.taxInfo);
const createUserService = (data) => DataService.post(API.payment.taxInfo, data);
const updateUserService = (data) => DataService.put(API.payment.taxInfo, data);
const setupStripeAccountService = (data) => DataService.post(API.payment.createStripeAccount, data);
const linkStripeAccountService = () => DataService.get(API.payment.linkStripeAccount);
const makeMilestonePaymentService = (data) => DataService.post(API.payment.makeMilestonePayment, data);
const applicationFeeService = () => DataService.get(API.payment.applicationFee);

export {
  createUserService,
  updateUserService,
  setupStripeAccountService,
  getPaymentDetailService,
  linkStripeAccountService,
  makeMilestonePaymentService,
  applicationFeeService,
};
