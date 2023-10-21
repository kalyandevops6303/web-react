import ShowToastMessage from '../../@core/components/toast';
import { makeFavService, removeFavService } from '../../services/profileServices';
import {
  acceptInvitation,
  checkDocumentActivatedService,
  getBidDetailsService,
  getCommonBidDetailsService,
  getCommonBidPublicDetailsService,
  getDocumentService,
  getDocumentTimelineService,
  getInvitatedByService,
  getInvitedByService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  getUnassignedRoleService,
  projectDetailsService,
  rejectInvitation,
  removeWorkerService,
  sendDocumentService,
  signContractByTalentServive,
  terminateContractService,
  updateBidStatusService,
} from '../../services/projectDetailsServices';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import errorHandler from '../../utility/errorHandler';
import {
  checkDocumentActivatedFailure,
  checkDocumentActivatedRequest,
  checkDocumentActivatedSuccess,
  getBidInfoFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getBidMilestoneFailure,
  getBidMilestoneRequest,
  getBidMilestoneSuccess,
  getDocumentFailure,
  getDocumentRequest,
  getDocumentSuccess,
  getDocumentTimelineFailure,
  getDocumentTimelineRequest,
  getDocumentTimelineSuccess,
  getInvitedByFailure,
  getInvitedByRequest,
  getInvitedBySuccess,
  getInvitedMemberFailure,
  getInvitedMemberRequest,
  getInvitedMemberSuccess,
  getReceivedBidsFailure,
  getReceivedBidsRequest,
  getReceivedBidsSuccess,
  getTeamMemberFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  getUnassignedRoleFailure,
  getUnassignedRoleRequest,
  getUnassignedRoleSuccess,
  makeFavSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  removeFavSuccess,
  removeWorkerFailure,
  removeWorkerRequest,
  removeWorkerSuccess,
  sendDocumentFailure,
  sendDocumentRequest,
  sendDocumentSuccess,
  signContractByTalentFailure,
  signContractByTalentRequest,
  signContractByTalentSuccess,
  terminateContractFailure,
  terminateContractRequest,
  terminateContractSuccess,
  updateContractFailure,
  updateContractRequest,
  updateContractSuccess,
} from '../reducers/projectDetails';

const getProjectDetails = (projectId) => async (dispatch) => {
  dispatch(projectDetailsRequest());
  try {
    const res = await projectDetailsService(projectId);
    dispatch(projectDetailsSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, projectDetailsFailure);
  }
};

const getTeamMembers =
  ({ project_id }) =>
  async (dispatch) => {
    dispatch(getTeamMemberRequest());
    try {
      const res = await getProjectTeamMemberServive({ project_id });
      dispatch(getTeamMemberSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getTeamMemberFailure);
    }
  };

const getInvitedMember =
  ({ metadata, project_id }) =>
  async (dispatch) => {
    dispatch(getInvitedMemberRequest());
    try {
      const res = await getInvitatedByService({ metadata, project_id });
      dispatch(getInvitedMemberSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getInvitedMemberFailure);
    }
  };

const getUnassignedRoles =
  ({ project_id }) =>
  async (dispatch) => {
    dispatch(getUnassignedRoleRequest());
    try {
      const res = await getUnassignedRoleService({ project_id });
      dispatch(getUnassignedRoleSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getUnassignedRoleFailure);
    }
  };

const getReceivedBids =
  ({ project_id, metadata, search_text, bid_status }) =>
  async (dispatch) => {
    if (metadata?.page === 1) {
      dispatch(getReceivedBidsRequest());
    }

    try {
      const res = await getReceivedBidsService({ project_id, metadata, search_text, bid_status });
      dispatch(getReceivedBidsSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getReceivedBidsFailure);
    }
  };

const getBidDetails =
  ({ project_id, bid_id }) =>
  async (dispatch) => {
    dispatch(getBidInfoRequest());
    try {
      let res;
      if (bid_id) {
        res = await getBidDetailsService({ bid_id });
      } else {
        res = await getCommonBidDetailsService({ project_id });
      }
      dispatch(getBidInfoSuccess(res.data.data));
    } catch (error) {
      // errorHandler(error, getBidInfoFailure);
      dispatch(getBidInfoFailure(error));
      console.error(error);
    }
  };

const updateBidStatus =
  ({ bid_id, assign, onSuccess, onError }) =>
  async () => {
    try {
      await updateBidStatusService({ bid_id, assign });
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const getWhoInvited =
  ({ id, onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(getInvitedByRequest());
    try {
      const res = await getInvitedByService({ invitation_id: id });
      dispatch(getInvitedBySuccess(res.data.data));
      onSuccess(res.data.data);
    } catch (error) {
      onError();
      errorHandler(error, getInvitedByFailure);
    }
  };

const updateInvitation =
  ({ status, id, onSuccess, onError }) =>
  async () => {
    try {
      if (status === 'ACCEPTED') {
        await acceptInvitation({ id });
      }
      if (status === 'REJECTED') {
        await rejectInvitation({ id });
      }
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

const removeWorkerFromProjectTeam = (projectId, teamId, workerId, onSuccess) => async (dispatch) => {
  dispatch(removeWorkerRequest());
  try {
    const res = await removeWorkerService(projectId, teamId, workerId);
    dispatch(removeWorkerSuccess(res.data.data));
    onSuccess();
    ShowToastMessage(SUCCESS, res.data.data);
  } catch (error) {
    errorHandler(error, removeWorkerFailure);
  }
};

// Contract flow

const getDocumentTimeline =
  ({ project_id, doc_type }) =>
  async (dispatch) => {
    dispatch(getDocumentTimelineRequest());
    try {
      const res = await getDocumentTimelineService({ project_id, doc_type });

      if (doc_type === 'CONTRACT') {
        dispatch(getDocumentTimelineSuccess({ contractTimeline: res.data.data }));
      }
      if (doc_type === 'NDA') {
        dispatch(getDocumentTimelineSuccess({ ndaTimeline: res.data.data }));
      }
    } catch (error) {
      errorHandler(error, getDocumentTimelineFailure);
    }
  };

const checkDocumentActivated =
  ({ project_id, doc_type }) =>
  async (dispatch) => {
    dispatch(checkDocumentActivatedRequest());
    try {
      const res = await checkDocumentActivatedService({ project_id, doc_type });
      if (res.data.data.show_document) {
        dispatch(getDocumentTimeline({ project_id, doc_type }));
      }
      if (doc_type === 'CONTRACT') {
        dispatch(checkDocumentActivatedSuccess({ isContract: res.data.data }));
      }
      if (doc_type === 'NDA') {
        dispatch(checkDocumentActivatedSuccess({ isNDA: res.data.data }));
      }
    } catch (error) {
      errorHandler(error, checkDocumentActivatedFailure);
    }
  };

// Action creator for getting document timeline

const getDocument =
  ({ project_id, doc_type, document_id }) =>
  async (dispatch) => {
    dispatch(getDocumentRequest());
    try {
      const res = await getDocumentService({ project_id, doc_type, document_id });
      dispatch(getDocumentSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getDocumentFailure);
    }
  };

// Action creator for sending a document
const sendDocument =
  ({ project_id, doc_type, validity, data, onSuccess }) =>
  async (dispatch) => {
    dispatch(sendDocumentRequest());
    try {
      await sendDocumentService({ project_id, doc_type, validity, data });
      dispatch(sendDocumentSuccess());
      dispatch(getDocument({ document_id: '', project_id, doc_type }));
      onSuccess();
    } catch (error) {
      errorHandler(error, sendDocumentFailure);
    }
  };

// Action creator for signing a contract by talent
const signContractByTalent =
  ({ project_id, doc_type, role, onSuccess }) =>
  async (dispatch) => {
    dispatch(signContractByTalentRequest());
    try {
      await signContractByTalentServive({ project_id, doc_type, role });
      dispatch(signContractByTalentSuccess({ role }));
      onSuccess();
    } catch (error) {
      errorHandler(error, signContractByTalentFailure);
    }
  };

// Action creator for terminating a contract
const terminateContract =
  ({ project_id, doc_type, onSuccess }) =>
  async (dispatch) => {
    dispatch(terminateContractRequest());
    try {
      await terminateContractService({ project_id, doc_type });

      dispatch(terminateContractSuccess());
      onSuccess();
    } catch (error) {
      errorHandler(error, terminateContractFailure);
    }
  };

const updateContract =
  ({ project_id, doc_type, onSuccess, data, validity }) =>
  async (dispatch) => {
    dispatch(updateContractRequest());
    try {
      await sendDocumentService({ project_id, doc_type, data, validity });
      dispatch(getDocument({ document_id: '', project_id, doc_type }));
      dispatch(updateContractSuccess());
      onSuccess();
    } catch (error) {
      errorHandler(error, updateContractFailure);
    }
  };

const makeFavourite = (id, user_type) => async (dispatch) => {
  try {
    await makeFavService(id, user_type);
    dispatch(makeFavSuccess());
  } catch (error) {
    errorHandler(error);
  }
};
const removeFavourite = (id) => async (dispatch) => {
  try {
    await removeFavService({ user_id: id });
    dispatch(removeFavSuccess());
  } catch (error) {
    errorHandler(error);
  }
};

const getBidMilestone =
  ({ project_id, entity_id, onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(getBidMilestoneRequest());
    try {
      const res = await getCommonBidPublicDetailsService({ project_id, entity_id });
      dispatch(getBidMilestoneSuccess(res.data.data));
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, getBidMilestoneFailure);
    }
  };

export {
  makeFavourite,
  removeFavourite,
  getInvitedMember,
  checkDocumentActivated,
  getDocumentTimeline,
  updateContract,
  sendDocument,
  signContractByTalent,
  terminateContract,
  updateInvitation,
  getWhoInvited,
  getProjectDetails,
  getUnassignedRoles,
  updateBidStatus,
  getTeamMembers,
  getReceivedBids,
  getBidDetails,
  getDocument,
  removeWorkerFromProjectTeam,
  getBidMilestone,
};
