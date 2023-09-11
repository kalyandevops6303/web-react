import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const giveRatingService = (data) => DataService.post(API.rating.giveRating, data);

const yourSubmittedRatingService = (projectId) => DataService.get(`${API.rating.yourSubmittedRating}/${projectId}`);

const yourRatingService = (projectId) => DataService.get(`${API.rating.yourRating}/${projectId}`);

export { giveRatingService, yourSubmittedRatingService, yourRatingService };
