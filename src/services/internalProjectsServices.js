import API from '../configs/api';
import DataService from '../configs/dataService/dataService';


const getAllProjectsService = ({ metaData, data }) => DataService.post(`${API.marketplace.allProjectsUrl}?page=${metaData?.page}&page_size=${metaData?.page_size}`, data);

export {
    getAllProjectsService
};