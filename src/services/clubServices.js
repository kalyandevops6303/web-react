import API from '../configs/api';
// eslint-disable-next-line import/no-cycle
import DataService from '../configs/dataService/dataService';

const getClubsService = ({ filterData, metaData }) =>
  DataService.post(`${API.clubs.listClubs}?page=${metaData?.page}&page_size=${metaData?.page_size}`, filterData);

const getClubsCardInfoService = () => DataService.get(API.clubs.cardInfo);

const registerClubEmailService = (data) => DataService.post(API.auth.regsterClubEmail, data);

const changeMemberTypeService = (data) =>
  DataService.put(
    `${API.team.memberType}?user_id=${data?.user_id}&team_id=${data?.team_id}&member_type=${data?.member_type}`,
  );

export { getClubsService, getClubsCardInfoService, registerClubEmailService, changeMemberTypeService };
