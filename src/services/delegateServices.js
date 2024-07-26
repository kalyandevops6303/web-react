import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const delegateSignUpService = (data) => DataService.post(API.delegate.inviteDelegate, data);
const inviteDelegateService = (data) => DataService.post(API.delegate.signUpDelegate, data);

export { inviteDelegateService, delegateSignUpService };
