import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getPaymentDetailService = () => DataService.get(API.payment.taxInfo);
const createUserService = (data) => DataService.post(API.payment.taxInfo, data);
const updateUserService = (data) => DataService.put(API.payment.taxInfo, data);
const setupStripeAccountService = (data) => DataService.post(API.payment.createStripeAccount, data);
const linkStripeAccountService = () => DataService.get(API.payment.linkStripeAccount);
const makeMilestonePaymentService = (data) => DataService.post(API.payment.makeMilestonePayment, data);
const applicationFeeService = (projectId) => DataService.get(`${API.payment.applicationFee}?project_id=${projectId}`);
const transferFundService = (data) => DataService.post(API.payment.transferFunds, data);
const spendingDetailService = () => DataService.get(API.payment.spendingDetails);
const upcomingPaymentsService = () => DataService.get(API.payment.upcomingPayments);
const updatePaymentStatusService = (data) => DataService.post(API.payment.updatePaymentStatus, data);

export {
  createUserService,
  updateUserService,
  setupStripeAccountService,
  getPaymentDetailService,
  linkStripeAccountService,
  makeMilestonePaymentService,
  applicationFeeService,
  transferFundService,
  spendingDetailService,
  upcomingPaymentsService,
  updatePaymentStatusService,
};
