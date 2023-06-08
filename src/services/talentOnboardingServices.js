import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDetailsService = () => DataService.get(API.talentOnboarding.userDetails);

const accountDetailsService = (data) => DataService.post(API.talentOnboarding.accountDetails, data);

const profileDetailsService = (data) => DataService.put(API.talentOnboarding.profileDetails, data);

export { userDetailsService, accountDetailsService, profileDetailsService };
