import ShowToastMessage from '../../@core/components/toast';
import { makeFavService, removeFavService } from '../../services/profileServices';
import {
  acceptInvitation,
  checkDocumentActivatedService,
  extendPaymentValidityService,
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
  extendDocValidityService,
  terminateProjectService,
  relistProjectService,
  relistProjectByDateService,
  requestChangeService,
  rejectBidChangeService,
  acceptBidChangeService,
  getBidTimelineService,
  getBidSnapshotService,
} from '../../services/projectDetailsServices';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import errorHandler from '../../utility/errorHandler';
import {
  acceptBidChangeFailure,
  acceptBidChangeRequest,
  acceptBidChangeSuccess,
  checkDocumentActivatedFailure,
  checkDocumentActivatedRequest,
  checkDocumentActivatedSuccess,
  extendValidityFailure,
  extendValidityRequest,
  extendValiditySuccess,
  favUnfavError,
  favUnfavReq,
  getBidInfoFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getBidMilestoneFailure,
  getBidMilestoneRequest,
  getBidMilestoneSuccess,
  getBidTimelineFailure,
  getBidTimelineRequest,
  getBidTimelineSuccess,
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
  getbidSnapshotFailure,
  getbidSnapshotRequest,
  getbidSnapshotSuccess,
  makeFavSuccess,
  projectDetailsFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  rejectBidChangeFailure,
  rejectBidChangeRequest,
  rejectBidChangeSuccess,
  relistProjectByDateFailure,
  relistProjectByDateRequest,
  relistProjectByDateSuccess,
  relistProjectFailure,
  relistProjectRequest,
  relistProjectSuccess,
  removeFavSuccess,
  removeWorkerFailure,
  removeWorkerRequest,
  removeWorkerSuccess,
  requestChangeFailure,
  requestChangeRequest,
  requestChangeSuccess,
  sendDocumentFailure,
  sendDocumentRequest,
  sendDocumentSuccess,
  signContractByTalentFailure,
  signContractByTalentRequest,
  signContractByTalentSuccess,
  terminateContractFailure,
  terminateContractRequest,
  terminateContractSuccess,
  terminateProjectFailure,
  terminateProjectRequest,
  terminateProjectSuccess,
  updateContractFailure,
  updateContractRequest,
  updateContractSuccess,
} from '../reducers/projectDetails';

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

const checkDocumentActivated =
  ({ isNDA, project_id }) =>
  async (dispatch) => {
    dispatch(checkDocumentActivatedRequest());
    try {
      let resContract;
      let resNDA;
      const getContract = async () => {
        dispatch(checkDocumentActivatedRequest());

        resContract = await checkDocumentActivatedService({ project_id, doc_type: 'CONTRACT' });
        // These lines can be uncommented if timeline to be opened directly
        // if (resContract.data.data.show_document) {
        //   dispatch(getDocumentTimeline({ project_id, doc_type: 'CONTRACT' }));
        // }
        dispatch(checkDocumentActivatedSuccess({ contractData: resContract.data.data }));
      };
      if (isNDA) {
        resNDA = await checkDocumentActivatedService({ project_id, doc_type: 'NDA' });
        // These lines can be uncommented if timeline to be opened directly
        // if (resNDA.data.data.show_document) {
        //   dispatch(getDocumentTimeline({ project_id, doc_type: 'NDA' }));
        // }
        dispatch(checkDocumentActivatedSuccess({ ndaData: resNDA.data.data }));

        if (resNDA.data.data.is_signed) {
          await getContract();
        } else {
          dispatch(checkDocumentActivatedSuccess({ contractData: { show_document: false, is_signed: false } }));
        }
      } else {
        await getContract();
      }
    } catch (error) {
      errorHandler(error, checkDocumentActivatedFailure);
    }
  };

const getProjectDetails =
  ({ projectId, isBidView }) =>
  async (dispatch) => {
    dispatch(projectDetailsRequest());
    try {
      const res = await projectDetailsService(projectId);
      if (isBidView) {
        dispatch(checkDocumentActivated({ isNDA: res?.data.data.nda?.is_nda, project_id: projectId }));
      }
      dispatch(projectDetailsSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, projectDetailsFailure);
    }
  };

const getBidTimeline =
  ({ project_id }) =>
  async (dispatch) => {
    dispatch(getBidTimelineRequest());
    try {
      const res = await getBidTimelineService({ project_id });
      dispatch(getBidTimelineSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getBidTimelineFailure);
    }
  };

const getBidSnapshot =
  ({ snapshot_id }) =>
  async (dispatch) => {
    dispatch(getbidSnapshotRequest());
    try {
      const res = await getBidSnapshotService({ snapshot_id });
      dispatch(getbidSnapshotSuccess(res.data.data));
    } catch (error) {
      errorHandler(error, getbidSnapshotFailure);
    }
  };

const requestChange =
  ({ bid_id, description, project_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(requestChangeRequest());
    try {
      await requestChangeService({ bid_id, description });
      dispatch(getProjectDetails({ projectId: project_id, isBidView: true }));
      onSuccess();
      dispatch(requestChangeSuccess());
    } catch (error) {
      errorHandler(error, requestChangeFailure);
    }
  };

const rejectBidChange =
  ({ snapshot_id, description, project_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(rejectBidChangeRequest());
    try {
      await rejectBidChangeService({ snapshot_id, description });
      dispatch(getProjectDetails({ projectId: project_id, isBidView: true }));
      onSuccess();
      dispatch(rejectBidChangeSuccess());
    } catch (error) {
      errorHandler(error, rejectBidChangeFailure);
    }
  };

const acceptBidChange =
  ({ snapshot_id, project_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(acceptBidChangeRequest());
    try {
      await acceptBidChangeService({ snapshot_id });
      dispatch(getProjectDetails({ projectId: project_id, isBidView: true }));
      onSuccess();
      dispatch(acceptBidChangeSuccess());
    } catch (error) {
      errorHandler(error, acceptBidChangeFailure);
    }
  };

const updateBidStatus =
  ({ bid_id, assign, status, onSuccess, onError }) =>
  async () => {
    try {
      await updateBidStatusService({ bid_id, assign });
      ShowToastMessage(SUCCESS, `Bid ${status?.toLowerCase()}`);
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

const removeWorkerFromProjectTeam =
  ({ projectId, teamId, role, workerId, onSuccess }) =>
  async (dispatch) => {
    dispatch(removeWorkerRequest());
    try {
      const res = await removeWorkerService(projectId, teamId, workerId, role);
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
    dispatch(getDocumentTimelineRequest({ doc_type }));
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
      const res = await sendDocumentService({ project_id, doc_type, validity, data });
      dispatch(sendDocumentSuccess());
      dispatch(getDocument({ document_id: '', project_id, doc_type }));
      ShowToastMessage(SUCCESS, res.data.data);
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
      const res = await signContractByTalentServive({ project_id, doc_type, role });
      dispatch(signContractByTalentSuccess({ role }));
      ShowToastMessage(SUCCESS, res.data.data);
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

// Action creator for extending docs

const extendValidity =
  ({ project_id, validity_type, onSuccess, onError }) =>
  async (dispatch) => {
    dispatch(extendValidityRequest());
    try {
      if (validity_type === 'DOCUMENT') {
        await extendDocValidityService({ project_id });
      } else if (validity_type === 'PAYMENT') {
        await extendPaymentValidityService({ project_id });
      }
      dispatch(extendValiditySuccess());
      onSuccess();
    } catch (error) {
      onError();
      errorHandler(error, extendValidityFailure);
    }
  };

// Action creator for terminate

const terminateProject =
  ({ project_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(terminateProjectRequest());
    try {
      const res = await terminateProjectService({ project_id });
      ShowToastMessage(SUCCESS, res.data.data);
      dispatch(terminateProjectSuccess());
      onSuccess();
    } catch (error) {
      errorHandler(error, terminateProjectFailure);
    }
  };

const relistProject =
  ({ project_id, onSuccess }) =>
  async (dispatch) => {
    dispatch(relistProjectRequest());
    try {
      const res = await relistProjectService({ project_id });
      ShowToastMessage(SUCCESS, res.data.data);
      dispatch(relistProjectSuccess());
      onSuccess();
    } catch (error) {
      errorHandler(error, relistProjectFailure);
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

const makeFavourite =
  ({ id, user_type }) =>
  async (dispatch) => {
    dispatch(favUnfavReq());
    try {
      await makeFavService(id, user_type);
      dispatch(makeFavSuccess());
    } catch (error) {
      errorHandler(error, favUnfavError);
    }
  };
const removeFavourite =
  ({ id }) =>
  async (dispatch) => {
    dispatch(favUnfavReq());
    try {
      await removeFavService({ user_id: id });
      dispatch(removeFavSuccess());
    } catch (error) {
      errorHandler(error, favUnfavError);
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

const relistProjectByDate = (projectId, startDate, endDate, onSuccess) => async (dispatch) => {
  dispatch(relistProjectByDateRequest());
  try {
    const res = await relistProjectByDateService(projectId, startDate, endDate);
    // ShowToastMessage(SUCCESS, res.data.data);
    dispatch(relistProjectByDateSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, relistProjectByDateFailure);
  }
};

export {
  extendValidity,
  terminateProject,
  relistProject,
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
  relistProjectByDate,
  requestChange,
  rejectBidChange,
  acceptBidChange,
  getBidTimeline,
  getBidSnapshot,
};
