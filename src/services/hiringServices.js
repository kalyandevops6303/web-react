import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const showHiringTabService = () => DataService.get(API.hiring.show_hiring_tab);

export {
    showHiringTabService
}