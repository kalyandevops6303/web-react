import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectDetails: null,
  projectDetailsLoading: false,
  getTeamMember: [],
  getTeamMemberLoading: false,
  receivedBids: [],
  ndaData: null,
  contractData: null,
  getReceivedBidsLoading: false,
  removeWorkerLoading: false,
  ndaTimeline: null,
  contractTimeline: null,
  relistProjectByDateLoading: false,
  error: null,
};

const projectDetails = createSlice({
  name: 'projectDetails',
  initialState,
  reducers: {
    clearProjectData: () => initialState,
    projectDetailsRequest: (state) => ({
      ...state,
      projectDetailsLoading: true,
      error: null,
    }),
    projectDetailsSuccess: (state, action) => ({
      ...state,
      projectDetails: action.payload,
      projectDetailsLoading: false,
    }),
    projectDetailsFailure: (state, action) => ({
      ...state,
      projectDetailsLoading: false,
      error: action.payload,
    }),

    getTeamMemberRequest: (state) => ({
      ...state,
      getTeamMemberLoading: true,
      error: null,
    }),
    getTeamMemberSuccess: (state, action) => ({
      ...state,
      getTeamMember: action.payload,
      getTeamMemberLoading: false,
      memberCurrentPreview: action.payload.data,
      // getTeamMember:
      //   action.payload.metadata.current_page === 1
      //     ? action.payload.data
      //     : [...state.getTeamMember, ...action.payload.data],
      // getMemberMetaData: action.payload.metadata,
    }),

    getTeamMemberFailure: (state, action) => ({
      ...state,
      getTeamMemberLoading: false,
      error: action.payload,
    }),

    getReceivedBidsRequest: (state) => ({
      ...state,
      getReceivedBidsLoading: true,
      error: null,
    }),
    getReceivedBidsSuccess: (state, action) => ({
      ...state,
      getReceivedBidsLoading: false,
      invitedMemberForProjectByClient: action.payload.total_invitations_count,
      receivedBidsPreview: action.payload.bids.data,
      receivedBids:
        action.payload.bids.metadata.current_page === 1
          ? action.payload.bids.data
          : [...state.receivedBids, ...action.payload.bids.data],
      receivedBidsMetaData: action.payload.bids.metadata,
    }),

    getReceivedBidsFailure: (state, action) => ({
      ...state,
      getReceivedBidsLoading: false,
      error: action.payload,
    }),
    getBidInfoRequest: (state) => ({
      ...state,
      getBidInfoLoading: true,
      errorBidInfo: null,
    }),
    getBidInfoSuccess: (state, action) => ({
      ...state,
      getBidInfoLoading: false,
      bidInfo: action.payload,
      errorBidInfo: null,
    }),

    getBidInfoFailure: (state, action) => ({
      ...state,
      getBidInfoLoading: false,
      errorBidInfo: action.payload,
    }),

    getBidTimelineRequest: (state) => ({
      ...state,
      getBidTimelineLoading: true,
      errorBidTimeline: null,
    }),
    getBidTimelineSuccess: (state, action) => ({
      ...state,
      getBidTimelineLoading: false,
      bidTimeline: action.payload,
      errorBidTimeline: null,
    }),

    getBidTimelineFailure: (state, action) => ({
      ...state,
      getBidTimelineLoading: false,
      errorBidTimeline: action.payload,
    }),

    getUnassignedRoleRequest: (state) => ({
      ...state,
      getUnassignedRoleLoading: true,
      error: null,
    }),
    getUnassignedRoleSuccess: (state, action) => ({
      ...state,
      getUnassignedRoleLoading: false,
      unassignedRole: action.payload,
    }),

    getUnassignedRoleFailure: (state, action) => ({
      ...state,
      getUnassignedRoleLoading: false,
      error: action.payload,
    }),

    getInvitedByRequest: (state) => ({
      ...state,
      getInvitedByLoading: true,
      error: null,
    }),
    getInvitedBySuccess: (state, action) => ({
      ...state,
      getInvitedByLoading: false,
      invitedBy: action.payload,
    }),

    getInvitedByFailure: (state, action) => ({
      ...state,
      getInvitedByLoading: false,
      error: action.payload,
    }),

    clearInitedByData: (state) => ({
      ...state,
      invitedBy: null,
    }),

    // Contract flow
    checkDocumentActivatedRequest: (state) => ({
      ...state,
      checkDocumentActivatedLoading: true,
      error: null,
    }),
    checkDocumentActivatedSuccess: (state, action) => ({
      ...state,
      checkDocumentActivatedLoading: false,
      ...action.payload,
    }),
    checkDocumentActivatedFailure: (state, action) => ({
      ...state,
      checkDocumentActivatedLoading: false,
      error: action.payload,
    }),

    clearDocstate: (state) => ({
      ...state,
      ndaData: null,
      contractData: null,
      ndaTimeline: null,
      contractTimeline: null,
    }),

    getDocumentRequest: (state) => ({
      ...state,
      getDocumentLoading: true,
      error: null,
    }),
    getDocumentSuccess: (state, action) => ({
      ...state,
      getDocumentLoading: false,
      projectWorkers: action.payload.workers,
      document: action.payload,
    }),
    getDocumentFailure: (state, action) => ({
      ...state,
      getDocumentLoading: false,
      error: action.payload,
    }),

    getDocumentTimelineRequest: (state, action) => ({
      ...state,
      getDocumentTimelineLoading: true,
      documentType: action.payload,
      error: null,
    }),
    getDocumentTimelineSuccess: (state, action) => ({
      ...state,
      getDocumentTimelineLoading: false,
      documentType: '',
      ...action.payload,
    }),
    getDocumentTimelineFailure: (state, action) => ({
      ...state,
      getDocumentTimelineLoading: false,
      documentType: '',
      error: action.payload,
    }),

    getbidSnapshotRequest: (state) => ({
      ...state,
      getbidSnapshotLoading: true,
      snapshotData: null,
      error: null,
    }),
    getbidSnapshotSuccess: (state, action) => ({
      ...state,
      getbidSnapshotLoading: false,
      snapshotData: action.payload,
      ...action.payload,
    }),
    getbidSnapshotFailure: (state, action) => ({
      ...state,
      getbidSnapshotLoading: false,
      snapshotData: null,
      error: action.payload,
    }),

    requestChangeRequest: (state) => ({
      ...state,
      requestChangeLoading: true,
      error: null,
    }),
    requestChangeSuccess: (state) => ({
      ...state,
      requestChangeLoading: false,
    }),
    requestChangeFailure: (state, action) => ({
      ...state,
      requestChangeLoading: false,
      error: action.payload,
    }),

    rejectBidChangeRequest: (state) => ({
      ...state,
      rejectBidChangeLoading: true,
      error: null,
    }),
    rejectBidChangeSuccess: (state) => ({
      ...state,
      rejectBidChangeLoading: false,
    }),
    rejectBidChangeFailure: (state, action) => ({
      ...state,
      rejectBidChangeLoading: false,
      error: action.payload,
    }),

    acceptBidChangeRequest: (state) => ({
      ...state,
      acceptBidChangeLoading: true,
      error: null,
    }),
    acceptBidChangeSuccess: (state) => ({
      ...state,
      acceptBidChangeLoading: false,
    }),
    acceptBidChangeFailure: (state, action) => ({
      ...state,
      acceptBidChangeLoading: false,
      error: action.payload,
    }),

    sendDocumentRequest: (state) => ({
      ...state,
      sendDocumentLoading: true,
      error: null,
    }),
    sendDocumentSuccess: (state) => ({
      ...state,
      sendDocumentLoading: false,
    }),
    sendDocumentFailure: (state, action) => ({
      ...state,
      sendDocumentLoading: false,
      error: action.payload,
    }),

    signContractByTalentRequest: (state) => ({
      ...state,
      signContractByTalentLoading: true,
      error: null,
    }),
    signContractByTalentSuccess: (state, action) => {
      const { role } = action.payload;

      // Find the index of the first worker with the matching role
      const workerIndex = state?.document?.workers.findIndex((worker) => !worker.is_signed && worker.role === role);

      if (workerIndex !== -1) {
        // If a matching worker is found, update it
        const updatedWorkers = [...state.document.workers];
        updatedWorkers[workerIndex] = { ...updatedWorkers[workerIndex], is_signed: true };

        return {
          ...state,
          signContractByTalentLoading: false,
          document: {
            ...state.document,
            workers: updatedWorkers,
          },
        };
      }

      // If no matching worker is found, return the original state
      return {
        ...state,
        signContractByTalentLoading: false,
      };
    },

    signContractByTalentFailure: (state, action) => ({
      ...state,
      signContractByTalentLoading: false,
      error: action.payload,
    }),

    terminateContractRequest: (state) => ({
      ...state,
      terminateContractLoading: true,
      error: null,
    }),
    terminateContractSuccess: (state) => ({
      ...state,
      terminateContractLoading: false,
      document: { ...state.document, is_terminated: true },
    }),
    terminateContractFailure: (state, action) => ({
      ...state,
      terminateContractLoading: false,
      error: action.payload,
    }),

    updateContractRequest: (state) => ({
      ...state,
      updateContractLoading: true,
      error: null,
    }),
    updateContractSuccess: (state) => ({
      ...state,
      updateContractLoading: false,
    }),
    updateContractFailure: (state, action) => ({
      ...state,
      updateContractLoading: false,
      error: action.payload,
    }),

    extendValidityRequest: (state) => ({
      ...state,
      extendValidityLoading: true,
      error: null,
    }),
    extendValiditySuccess: (state) => ({
      ...state,
      extendValidityLoading: false,
    }),
    extendValidityFailure: (state, action) => ({
      ...state,
      extendValidityLoading: false,
      error: action.payload,
    }),
    terminateProjectRequest: (state) => ({
      ...state,
      terminateProjectLoading: true,
      error: null,
    }),
    terminateProjectSuccess: (state) => ({
      ...state,
      terminateProjectLoading: false,
    }),
    terminateProjectFailure: (state, action) => ({
      ...state,
      terminateProjectLoading: false,
      error: action.payload,
    }),

    relistProjectRequest: (state) => ({
      ...state,
      relistProjectLoading: true,
      error: null,
    }),
    relistProjectSuccess: (state) => ({
      ...state,
      relistProjectLoading: false,
    }),
    relistProjectFailure: (state, action) => ({
      ...state,
      relistProjectLoading: false,
      error: action.payload,
    }),

    removeWorkerRequest: (state) => ({
      ...state,
      removeWorkerLoading: true,
      error: null,
    }),
    removeWorkerSuccess: (state) => ({
      ...state,
      removeWorkerLoading: false,
    }),
    removeWorkerFailure: (state, action) => ({
      ...state,
      removeWorkerLoading: false,
      error: action.payload,
    }),

    getInvitedMemberRequest: (state) => ({
      ...state,
      getInvitedMemberLoading: true,
      error: null,
    }),
    getInvitedMemberSuccess: (state, action) => ({
      ...state,

      getInvitedMemberLoading: false,
      invitedMemberCurrentPreview: action.payload.data,
      getInvitedMember:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.getInvitedMember, ...action.payload.data],
      invitedMemberMetaData: action.payload.metadata,
    }),
    getInvitedMemberFailure: (state, action) => ({
      ...state,
      getInvitedMemberLoading: false,
      error: action.payload,
    }),

    getBidMilestoneRequest: (state) => ({
      ...state,
      getBidMilestoneLoading: true,
      error: null,
    }),
    getBidMilestoneSuccess: (state, action) => ({
      ...state,
      getBidMilestoneLoading: false,
      bidMilestone: action.payload,
    }),
    getBidMilestoneFailure: (state, action) => ({
      ...state,
      getBidMilestoneLoading: false,
      error: action.payload,
    }),

    favUnfavReq: (state) => ({
      ...state,
      favUnfavLoading: true,
    }),

    favUnfavError: (state) => ({
      ...state,
      favUnfavLoading: false,
    }),

    makeFavSuccess: (state) => ({
      ...state,
      bidInfo: {
        ...state.bidInfo,
        user_details: {
          ...state.bidInfo.user_details,
          is_favorite: true,
        },
      },
    }),

    removeFavSuccess: (state) => ({
      ...state,
      bidInfo: {
        ...state.bidInfo,
        user_details: {
          ...state.bidInfo.user_details,
          is_favorite: false,
        },
      },
    }),

    relistProjectByDateRequest: (state) => ({
      ...state,
      relistProjectByDateLoading: true,
      error: null,
    }),
    relistProjectByDateSuccess: (state) => ({
      ...state,
      relistProjectByDateLoading: false,
    }),
    relistProjectByDateFailure: (state, action) => ({
      ...state,
      relistProjectByDateLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  clearDocstate,
  makeFavSuccess,
  favUnfavReq,
  favUnfavError,
  removeFavSuccess,
  getInvitedMemberFailure,
  getInvitedMemberRequest,
  getInvitedMemberSuccess,
  checkDocumentActivatedRequest,
  checkDocumentActivatedSuccess,
  checkDocumentActivatedFailure,
  getDocumentTimelineRequest,
  getDocumentTimelineSuccess,
  getDocumentTimelineFailure,
  getDocumentRequest,
  getDocumentSuccess,
  getDocumentFailure,
  sendDocumentRequest,
  sendDocumentSuccess,
  sendDocumentFailure,
  signContractByTalentRequest,
  signContractByTalentSuccess,
  signContractByTalentFailure,
  terminateContractRequest,
  terminateContractSuccess,
  terminateContractFailure,
  getInvitedByRequest,
  getInvitedBySuccess,
  getInvitedByFailure,
  clearInitedByData,
  getUnassignedRoleRequest,
  getUnassignedRoleSuccess,
  getUnassignedRoleFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getBidInfoFailure,
  getBidTimelineRequest,
  getBidTimelineSuccess,
  getBidTimelineFailure,
  getReceivedBidsRequest,
  getReceivedBidsSuccess,
  getReceivedBidsFailure,
  getTeamMemberRequest,
  getTeamMemberSuccess,
  getTeamMemberFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  projectDetailsFailure,
  clearProjectData,
  updateContractRequest,
  updateContractSuccess,
  updateContractFailure,
  removeWorkerRequest,
  removeWorkerSuccess,
  removeWorkerFailure,
  getBidMilestoneRequest,
  getBidMilestoneSuccess,
  getBidMilestoneFailure,
  extendValidityRequest,
  extendValiditySuccess,
  extendValidityFailure,
  terminateProjectRequest,
  terminateProjectSuccess,
  terminateProjectFailure,
  relistProjectRequest,
  relistProjectSuccess,
  relistProjectFailure,
  relistProjectByDateRequest,
  relistProjectByDateSuccess,
  relistProjectByDateFailure,
  requestChangeRequest,
  requestChangeSuccess,
  requestChangeFailure,
  rejectBidChangeRequest,
  rejectBidChangeSuccess,
  rejectBidChangeFailure,
  acceptBidChangeRequest,
  acceptBidChangeSuccess,
  acceptBidChangeFailure,
  getbidSnapshotRequest,
  getbidSnapshotSuccess,
  getbidSnapshotFailure,
} = projectDetails.actions;

export default projectDetails.reducer;
