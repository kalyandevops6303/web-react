import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectDetails: null,
  projectDetailsLoading: false,
  getTeamMember: [],
  getTeamMemberLoading: false,
  receivedBids: [],
  getReceivedBidsLoading: false,
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
      projectDetailsLoading: false,
      projectDetails: action.payload,
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
      error: null,
    }),
    getBidInfoSuccess: (state, action) => ({
      ...state,
      getBidInfoLoading: false,
      bidInfo: action.payload,
    }),

    getBidInfoFailure: (state, action) => ({
      ...state,
      getReceivedBidsLoading: false,
      error: action.payload,
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

    getDocumentTimelineRequest: (state) => ({
      ...state,
      getDocumentTimelineLoading: true,
      error: null,
    }),
    getDocumentTimelineSuccess: (state, action) => ({
      ...state,
      getDocumentTimelineLoading: false,
      ...action.payload,
    }),
    getDocumentTimelineFailure: (state, action) => ({
      ...state,
      getDocumentTimelineLoading: false,
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
      document: { ...state.document, is_contract_sent: true },
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
      // Find all workers with the matching user_id
      const updatedWorkers = state?.document?.workers.map((worker) => {
        if (worker.user_id === action.payload.user_id) {
          return { ...worker, is_signed: true };
        }
        return worker;
      });

      return {
        ...state,
        signContractByTalentLoading: false,
        document: {
          ...state.document,
          workers: updatedWorkers,
        },
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
  },
});

export const {
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
  getUnassignedRoleRequest,
  getUnassignedRoleSuccess,
  getUnassignedRoleFailure,
  getBidInfoRequest,
  getBidInfoSuccess,
  getBidInfoFailure,
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
} = projectDetails.actions;

export default projectDetails.reducer;
