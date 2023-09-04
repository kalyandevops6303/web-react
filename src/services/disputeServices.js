import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const paginatedProjectsService = (page, search) =>
  DataService.get(`${API.dispute.paginatedProjects}?page=${page}&page_size=10&search_query=${search}`);

const raiseDisputeService = (data) => DataService.post(API.dispute.raiseDispute, data);

const allDisputesService = (page, pageSize) =>
  DataService.get(`${API.dispute.allDisputes}?page=${page}&page_size=${pageSize}`);

const acceptDisputeService = (disputeId) => DataService.put(`${API.dispute.acceptDispute}/${disputeId}`);

const replyOnDisputeService = (data) => DataService.post(API.dispute.replyOnDispute, data);

const disputeRepliesService = (disputeId, page, pageSize) =>
  DataService.get(`${API.dispute.disputeReplies}/${disputeId}?page=${page}&page_size=${pageSize}`);

const disputeReplyFileUploadService = (filename, disputeId) =>
  DataService.get(`${API.dispute.disputeReplyFileUpload}?filename=${filename}&dispute_id=${disputeId}`);

const disputeReplyFileUploadToAzureService = (url, data, headers) => DataService.putWithoutToken(url, data, headers);

export {
  paginatedProjectsService,
  raiseDisputeService,
  allDisputesService,
  acceptDisputeService,
  replyOnDisputeService,
  disputeRepliesService,
  disputeReplyFileUploadService,
  disputeReplyFileUploadToAzureService,
};
