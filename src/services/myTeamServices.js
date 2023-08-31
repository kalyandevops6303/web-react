import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const getCardService = () => DataService.get(API.myTeams.cardInfo);

const getTeamsService = () => DataService.get(API.myTeams.listTeams);

export { getCardService, getTeamsService };
