import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const paginatedProjectsService = (page, search) =>
  DataService.get(`${API.dispute.paginatedProjects}?page=${page}&page_size=10&search_query=${search}`);

const raiseDisputeService = (data) => DataService.post(API.dispute.raiseDispute, data);

const allDisputesService = (page, pageSize) =>
  DataService.get(`${API.dispute.allDisputes}?page=${page}&page_size=${pageSize}`);

const acceptDisputeService = (disputeId) => DataService.put(`${API.dispute.acceptDispute}/${disputeId}`);

export { paginatedProjectsService, raiseDisputeService, allDisputesService, acceptDisputeService };
