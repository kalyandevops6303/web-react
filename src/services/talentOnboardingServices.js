import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const userDetailsService = () => DataService.get(API.talentOnboarding.userDetails);

const accountDetailsService = (data) => DataService.post(API.talentOnboarding.accountDetails, data);

const profileDetailsService = (data) => DataService.put(API.talentOnboarding.profileDetails, data);

const checkpointCompleteService = () => DataService.post(API.talentOnboarding.checkpointComplete);

const profileImageUploadService = (filename) =>
  DataService.get(`${API.talentOnboarding.profileImageUpload}?filename=${filename}`);

const profileImageUploadToAzureService = (url, data, headers) => DataService.putWithoutToken(url, data, headers);

export {
  userDetailsService,
  accountDetailsService,
  profileDetailsService,
  checkpointCompleteService,
  profileImageUploadService,
  profileImageUploadToAzureService,
};
