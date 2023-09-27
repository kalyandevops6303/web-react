import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createReferralService = (data) => DataService.post(API.referralAndReward.createReferrals, data);

const validateReferralService = (token) =>
  DataService.get(`${API.referralAndReward.validateReferral}?referral_token=${token}`);

export { createReferralService, validateReferralService };
