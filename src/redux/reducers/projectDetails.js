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
  },
});

export const {
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
} = projectDetails.actions;

export default projectDetails.reducer;
