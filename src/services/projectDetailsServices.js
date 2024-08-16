import API from '../configs/api';
// eslint-disable-next-line import/no-cycle
import DataService from '../configs/dataService/dataService';

const projectDetailsService = (projectId) =>
  DataService.get(`${API.projectDetails.getProjectDetails}?project_id=${projectId}`);

const getProjectTeamMemberServive = ({ project_id }) =>
  DataService.get(`${API.projectDetails.getProjectTeamMember}?project_id=${project_id}`);

const getUnassignedRoleService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.unassignRole}?project_id=${project_id}`);

const getReceivedBidsService = ({ project_id, metadata, search_text, bid_status }) => {
  if (bid_status) {
    return DataService.get(
      `${API.projectDetails.getReceivedBids}?project_id=${project_id}&page=${metadata?.page}&page_size=${metadata?.page_size}&search_text=${search_text}&bid_status=${bid_status}`,
    );
  }
  return DataService.get(
    `${API.projectDetails.getReceivedBids}?project_id=${project_id}&page=${metadata?.page}&page_size=${metadata?.page_size}&search_text=${search_text}`,
  );
};

const getBidDetailsService = ({ bid_id }) => DataService.put(`${API.projectDetails.getBidReview}?bid_id=${bid_id}`);

const getBidTimelineService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.getBidTimeline}?project_id=${project_id}`);

const getBidSnapshotService = ({ snapshot_id }) =>
  DataService.get(`${API.projectDetails.getBidSnapshot}?bid_snapshot_id=${snapshot_id}`);
const getCommonBidDetailsService = ({ project_id, entity_id }) =>
  DataService.get(`${API.projectDetails.commonBidInfo}?project_id=${project_id}&entity_id=${entity_id}`);

const getCommonBidPublicDetailsService = ({ project_id, entity_id }) =>
  DataService.get(`${API.projectDetails.commonBidInfoPublic}?project_id=${project_id}&entity_id=${entity_id}`);

const updateBidStatusService = ({ bid_id, assign }) =>
  DataService.put(`${API.projectDetails.assignBid}?bid_id=${bid_id}&assign=${assign}`);

const getInvitedByService = ({ invitation_id }) =>
  DataService.get(`${API.projectDetails.getInvitaion}/${invitation_id}`);

const acceptInvitation = ({ id }) => DataService.put(`${API.projectDetails.accept}/${id}`);

const rejectInvitation = ({ id }) => DataService.put(`${API.projectDetails.reject}/${id}`);

const removeWorkerService = (projectId, teamId, workerId, role) =>
  DataService.put(
    `${API.projectDetails.removeWorker}?role=${role}&project_id=${projectId}&team_id=${teamId}&worker_id=${workerId}`,
  );

// Contract flow

const checkDocumentActivatedService = ({ project_id, doc_type }) =>
  DataService.get(`${API.projectDetails.checkDocumentActivated}?doc_type=${doc_type}&project_id=${project_id}`);

const getDocumentService = ({ project_id, doc_type, document_id }) => {
  if (document_id) {
    return DataService.get(
      `${API.projectDetails.getDocument}?doc_type=${doc_type}&project_id=${project_id}&document_id=${document_id}`,
    );
  }
  return DataService.get(`${API.projectDetails.getDocument}?doc_type=${doc_type}&project_id=${project_id}`);
};

const getDocumentTimelineService = ({ project_id, doc_type }) =>
  DataService.get(`${API.projectDetails.getDocumentTimeline}?project_id=${project_id}&doc_type=${doc_type}`);

const sendDocumentService = ({ project_id, doc_type, data, validity }) =>
  DataService.post(
    `${API.projectDetails.sendDocument}`,
    {
      project_id,
      doc_type,
      validity,
      doc_content: data
    }
  );

const signContractByTalentServive = ({ project_id, doc_type, role }) =>
  DataService.put(
    `${API.projectDetails.signContractByTalent}?project_id=${project_id}&doc_type=${doc_type}&role=${role}`,
  );

const terminateContractService = ({ project_id, doc_type }) =>
  DataService.delete(
    `${API.projectDetails.terminateContract}?project_id=${project_id}&doc_type=${doc_type}&decline_bid=true`,
  );

const getInvitatedByService = ({ project_id, metadata }) =>
  DataService.get(
    `${API.projectDetails.requests}?&page=${metadata?.page}&page_size=${metadata?.page_size}&project_id=${project_id}`,
  );

const bestTalentsForProjectService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.projectDetails.bestTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}&project_id=${projectId}`,
  );

const favoriteTalentsForProjectService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.projectDetails.favoriteTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}&project_id=${projectId}`,
  );

const almaMaterTalentsProjectService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.projectDetails.almaMaterTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}&project_id=${projectId}`,
  );

const extendDocValidityService = ({ project_id }) =>
  DataService.put(`${API.projectDetails.extendDocValidity}?project_id=${project_id}`);

const extendPaymentValidityService = ({ project_id }) =>
  DataService.put(`${API.projectDetails.extendPaymentValidity}?project_id=${project_id}`);

const terminateProjectService = ({ project_id }) =>
  DataService.put(`${API.projectDetails.terminateProject}?project_id=${project_id}`);

const withdrawProjectServices = ({ project_id }) =>
  DataService.put(`${API.projectDetails.withdrawProject}?project_id=${project_id}`);

const relistProjectService = ({ project_id }) =>
  DataService.put(`${API.projectDetails.relistProject}?project_id=${project_id}`);

const relistProjectByDateService = (projectId, startDate, endDate) =>
  DataService.put(
    `${API.projectDetails.relistProjectByDate}?project_id=${projectId}&start_date=${startDate}&end_date=${endDate}`,
  );

const requestChangeService = ({ bid_id, description }) =>
  DataService.post(`${API.projectDetails.requestChange}`, { bid_id, description });

const rejectBidChangeService = ({ snapshot_id, description }) =>
  DataService.put(`${API.projectDetails.rejectBidChange}?bid_snapshot_id=${snapshot_id}`, { description });

const acceptBidChangeService = ({ snapshot_id }) =>
  DataService.put(`${API.projectDetails.acceptBidChange}?bid_snapshot_id=${snapshot_id}`);

const getActiveStageService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.getActiveStage}?project_id=${project_id}`);
const getAppConfigService = () => DataService.get(`${API.projectDetails.getAppConfig}`);

const downloadCertificateService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.downloadCertificate}?project_id=${project_id}`);
export {
  extendDocValidityService,
  extendPaymentValidityService,
  getCommonBidPublicDetailsService,
  bestTalentsForProjectService,
  favoriteTalentsForProjectService,
  almaMaterTalentsProjectService,
  getInvitatedByService,
  getDocumentService,
  checkDocumentActivatedService,
  getDocumentTimelineService,
  sendDocumentService,
  signContractByTalentServive,
  terminateContractService,
  acceptInvitation,
  rejectInvitation,
  removeWorkerService,
  getInvitedByService,
  projectDetailsService,
  getBidDetailsService,
  updateBidStatusService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  getCommonBidDetailsService,
  getUnassignedRoleService,
  terminateProjectService,
  withdrawProjectServices,
  relistProjectService,
  relistProjectByDateService,
  requestChangeService,
  rejectBidChangeService,
  acceptBidChangeService,
  getBidTimelineService,
  getBidSnapshotService,
  getActiveStageService,
  getAppConfigService,
  downloadCertificateService,
};
