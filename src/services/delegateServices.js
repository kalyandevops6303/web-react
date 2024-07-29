import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const delegateSignUpService = (data) => DataService.post(API.delegate.signUpDelegate, data);
const inviteDelegateService = (data) => DataService.post(API.delegate.inviteDelegate, data);
const delegateInvitationStatusService = ({ page = 1, pageSize = 5 }) =>
  DataService.post(`${API.delegate.delegateInvitationStatus}&page=${page}&page_size=${pageSize}`);

export { inviteDelegateService, delegateSignUpService, delegateInvitationStatusService };
