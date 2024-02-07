import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bestTalents: null,
  bestTalentsLoading: false,
  favoriteTalents: null,
  favoriteTalentsLoading: false,
  almaMaterTalents: null,
  almaMaterTalentsLoading: false,
  inviteTalentsLoading: false,
  isClubAdmin: false,
  error: null,
};

const inviteTalentSlice = createSlice({
  name: 'inviteTalent',
  initialState,
  reducers: {
    clearCreateProjectData: (state) => ({
      ...state,
      bestTalents: null,
      bestTalentsLoading: false,
      favoriteTalents: null,
      favoriteTalentsLoading: false,
      almaMaterTalents: null,
      almaMaterTalentsLoading: false,
    }),

    bestTalentsRequest: (state) => ({
      ...state,
      bestTalentsLoading: true,
      error: null,
    }),
    bestTalentsSuccess: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      bestTalents: action.payload,
    }),
    bestTalentsFailure: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      error: action.payload,
    }),

    favoriteTalentsRequest: (state) => ({
      ...state,
      favoriteTalentsLoading: true,
      error: null,
    }),
    favoriteTalentsSuccess: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      favoriteTalents: action.payload,
    }),
    favoriteTalentsFailure: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      error: action.payload,
    }),

    almaMaterTalentsRequest: (state) => ({
      ...state,
      almaMaterTalentsLoading: true,
      error: null,
    }),
    almaMaterTalentsSuccess: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      almaMaterTalents: action.payload,
    }),
    almaMaterTalentsFailure: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      error: action.payload,
    }),

    inviteTalentsRequest: (state) => ({
      ...state,
      inviteTalentsLoading: true,
      error: null,
    }),
    inviteTalentsSuccess: (state) => ({
      ...state,
      inviteTalentsLoading: false,
    }),
    inviteTalentsFailure: (state, action) => ({
      ...state,
      inviteTalentsLoading: false,
      error: action.payload,
    }),

    teamMemberForInviteRequest: (state) => ({
      ...state,
      teamMemberForInviteLoading: true,
      error: null,
    }),
    teamMemberForInviteSuccess: (state, action) => ({
      ...state,
      teamMemberForInviteLoading: false,
      teamMemberForInvite: action.payload,
    }),
    teamMemberForInviteFailure: (state, action) => ({
      ...state,
      teamMemberForInviteLoading: false,
      error: action.payload,
    }),

    getRequestStatusRequest: (state) => ({
      ...state,
      getRequestStatusLoading: true,
      error: null,
    }),
    getRequestStatusSuccess: (state, action) => ({
      ...state,
      getRequestStatusLoading: false,
      getRequestStatus: action.payload,
    }),
    getRequestStatusFailure: (state, action) => ({
      ...state,
      teamMemberForInviteLoading: false,
      error: action.payload,
    }),
    getAdminAccessRequest: (state) => ({
      ...state,
      getAdminAcessLoading: true,
      isClubAdmin: false,
      error: null,
    }),
    getAdminAccessSuccess: (state, action) => ({
      ...state,
      getAdminAcessLoading: false,
      isClubAdmin: action.payload,
    }),
    getAdminAccessFailure: (state, action) => ({
      ...state,
      getAdminAcessLoading: false,
      isClubAdmin: false,
      error: action.payload,
    }),
    clearModalData: (state) => ({
      ...state,
      bestTalents: null,
      bestTalentsLoading: false,
      favoriteTalents: null,
      favoriteTalentsLoading: false,
      almaMaterTalents: null,
      almaMaterTalentsLoading: false,
    }),
  },
});

export const {
  clearModalData,
  getAdminAccessSuccess,
  getAdminAccessRequest,
  getAdminAccessFailure,
  getRequestStatusFailure,
  getRequestStatusSuccess,
  getRequestStatusRequest,
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  clearCreateProjectData,
  bestTalentsRequest,
  bestTalentsSuccess,
  bestTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  favoriteTalentsFailure,
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  almaMaterTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  inviteTalentsFailure,
  teamMemberForInviteRequest,
  teamMemberForInviteSuccess,
  teamMemberForInviteFailure,
} = inviteTalentSlice.actions;

export default inviteTalentSlice.reducer;
