import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createReferralService = (data) => DataService.post(API.referralAndReward.createReferrals, data);

const validateReferralService = (token) =>
  DataService.get(`${API.referralAndReward.validateReferral}?referral_token=${token}`);

const convertReferralService = (referralId, userId, userType) =>
  DataService.put(
    `${API.referralAndReward.convertReferral}?referral_id=${referralId}&user_id=${userId}&user_type=${userType}`,
  );

export { createReferralService, validateReferralService, convertReferralService };
