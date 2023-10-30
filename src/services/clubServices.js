import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const registerClubEmailService = (data) => DataService.post(API.auth.regsterClubEmail, data);

// eslint-disable-next-line import/prefer-default-export
export { registerClubEmailService };
