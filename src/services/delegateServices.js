import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const delegateSignUpService = ({ data, invitationToken }) =>
  DataService.post(`${API.delegate.signUpDelegate}?_invitation_token=${invitationToken}`, data);

const inviteDelegateService = (data) => DataService.post(API.delegate.inviteDelegate, data);

const delegateInvitationStatusService = ({ metadata }) =>
  DataService.get(`${API.delegate.delegateInvitationStatus}?page=${metadata?.page}&page_size=${metadata?.pageSize}`);

export { inviteDelegateService, delegateSignUpService, delegateInvitationStatusService };
