import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createReferralService = (data) => DataService.post(API.referralAndReward.createReferrals, data);

// eslint-disable-next-line import/prefer-default-export
export { createReferralService };
