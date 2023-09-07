import {
  acceptInvitation,
  checkDocumentActivatedService,
  getBidDetailsService,
  getCommonBidDetailsService,
  getDocumentService,
  getDocumentTimelineService,
  getInvitedByService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  getUnassignedRoleService,
  projectDetailsService,
  rejectInvitation,
  sendDocumentService,
  signContractByTalentServive,
  terminateContractService,
  updateBidStatusService,
} from '../../services/projectDetailsServices';
import errorHandler from '../../utility/errorHandler';
import {
  checkDocumentActivatedFailure,
  checkDocumentActivatedRequest,
  checkDocumentActivatedSuccess,
  getBidInfoFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getDocumentFailure,
  getDocumentRequest,
  getDocumentSuccess,
  getDocumentTimelineFailure,
  getDocumentTimelineRequest,
  getDocumentTimelineSuccess,
  getInvitedByFailure,
  getInvitedByRequest,
  getInvitedBySuccess,
  getReceivedBidsFailure,
  getReceivedBidsRequest,
  getReceivedBidsSuccess,
  getTeamMemberFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  getUnassignedRoleFailure,
  getUnassignedRoleRequest,
  getUnassignedRoleSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  sendDocumentFailure,
  sendDocumentRequest,
  sendDocumentSuccess,
  signContractByTalentFailure,
  signContractByTalentRequest,
  signContractByTalentSuccess,
  terminateContractFailure,
  terminateContractRequest,
  terminateContractSuccess,
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
    dispatch(getReceivedBidsRequest());
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
      errorHandler(error, getBidInfoFailure);
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
      if (status === 'DECLINED') {
        await rejectInvitation({ id });
      }
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

// Contract flow

const checkDocumentActivated =
  ({ project_id, doc_type }) =>
  async (dispatch) => {
    dispatch(checkDocumentActivatedRequest());
    try {
      const res = await checkDocumentActivatedService({ project_id, doc_type });
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
  ({ project_id, doc_type }) =>
  async (dispatch) => {
    dispatch(getDocumentRequest());
    try {
      const res = await getDocumentService({ project_id, doc_type });
      dispatch(getDocumentSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getDocumentFailure);
    }
  };

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

// Action creator for sending a document
const sendDocument =
  ({ project_id, doc_type, validity, data, onSuccess }) =>
  async (dispatch) => {
    dispatch(sendDocumentRequest());
    try {
      await sendDocumentService({ project_id, doc_type, validity, data });
      dispatch(sendDocumentSuccess());
      onSuccess();
    } catch (error) {
      errorHandler(error, sendDocumentFailure);
    }
  };

// Action creator for signing a contract by talent
const signContractByTalent =
  ({ project_id, doc_type, user_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(signContractByTalentRequest());
    try {
      await signContractByTalentServive({ project_id, doc_type });
      dispatch(signContractByTalentSuccess({ user_id }));
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

export {
  checkDocumentActivated,
  getDocumentTimeline,
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
};
