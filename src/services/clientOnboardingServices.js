import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const accountDetailsService = (data) => DataService.post(API.clientOnboarding.accountDetails, data);

const profileDetailsService = (data) => DataService.put(API.clientOnboarding.profileDetails, data);

export { accountDetailsService, profileDetailsService };
