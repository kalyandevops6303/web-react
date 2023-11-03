import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createReferralService = (data) => DataService.post(API.referralAndReward.createReferrals, data);

const validateReferralService = (token) =>
  DataService.get(`${API.referralAndReward.validateReferral}?referral_token=${token}`);

const convertReferralService = (referralId, email, referral_invitation_type) =>
  DataService.put(
    `${API.referralAndReward.convertReferral}?referral_id=${referralId}&email=${email}&referral_invitation_type=${referral_invitation_type}`,
  );

const allReferralsService = (page, pageSize) =>
  DataService.get(`${API.referralAndReward.createReferrals}?page=${page}&page_size=${pageSize}`);

export { createReferralService, validateReferralService, convertReferralService, allReferralsService };
