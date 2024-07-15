import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkBidLoading: false,
  createBidLoading: false,
  projectDetails: null,
  projectDetailsLoading: false,
  bidDetails: null,
  bidDetailsLoading: false,
  recommendedRoles: null,
  allTeamMembers: null,
  rolesLoading: false,
  setWorkersLoading: false,
  draftSetWorkersLoading: false,
  setMilestonesLoading: false,
  draftSetMilestonesLoading: false,
  getDraftMilestoneLoading: false,
  submitBidLoading: false,
  changeBidTypeLoading: false,
  deleteDraftBidLoading: false,
  error: null,
};

const createBid = createSlice({
  name: 'createBid',
  initialState,
  reducers: {
    checkBidRequest: (state) => ({
      ...state,
      checkBidLoading: true,
      error: null,
    }),
    checkBidSuccess: (state) => ({
      ...state,
      checkBidLoading: false,
    }),
    checkBidFailure: (state, action) => ({
      ...state,
      checkBidLoading: false,
      error: action.payload,
    }),

    createBidRequest: (state) => ({
      ...state,
      createBidLoading: true,
      error: null,
    }),
    createBidSuccess: (state) => ({
      ...state,
      createBidLoading: false,
    }),
    createBidFailure: (state, action) => ({
      ...state,
      createBidLoading: false,
      error: action.payload,
    }),

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

    bidDetailsRequest: (state) => ({
      ...state,
      bidDetailsLoading: true,
      error: null,
    }),
    bidDetailsSuccess: (state, action) => ({
      ...state,
      bidDetailsLoading: false,
      bidDetails: action.payload,
    }),
    bidDetailsFailure: (state, action) => ({
      ...state,
      bidDetailsLoading: false,
      error: action.payload,
    }),

    rolesRequest: (state) => ({
      ...state,
      rolesLoading: true,
      error: null,
    }),
    rolesSuccess: (state, action) => ({
      ...state,
      rolesLoading: false,
      recommendedRoles: action.payload.recommended,
      allTeamMembers: action.payload.all,
    }),
    rolesFailure: (state, action) => ({
      ...state,
      rolesLoading: false,
      error: action.payload,
    }),

    setWorkersRequest: (state) => ({
      ...state,
      setWorkersLoading: true,
      error: null,
    }),
    setWorkersSuccess: (state) => ({
      ...state,
      setWorkersLoading: false,
    }),
    setWorkersFailure: (state, action) => ({
      ...state,
      setWorkersLoading: false,
      error: action.payload,
    }),

    draftSetWorkersRequest: (state) => ({
      ...state,
      draftSetWorkersLoading: true,
      error: null,
    }),
    draftSetWorkersSuccess: (state) => ({
      ...state,
      draftSetWorkersLoading: false,
    }),
    draftSetWorkersFailure: (state, action) => ({
      ...state,
      draftSetWorkersLoading: false,
      error: action.payload,
    }),

    setMilestonesRequest: (state) => ({
      ...state,
      setMilestonesLoading: true,
      error: null,
    }),
    setMilestonesSuccess: (state) => ({
      ...state,
      setMilestonesLoading: false,
    }),
    setMilestonesFailure: (state, action) => ({
      ...state,
      setMilestonesLoading: false,
      error: action.payload,
    }),

    draftSetMilestonesRequest: (state) => ({
      ...state,
      draftSetMilestonesLoading: true,
      error: null,
    }),
    draftSetMilestonesSuccess: (state) => ({
      ...state,
      draftSetMilestonesLoading: false,
    }),
    draftSetMilestonesFailure: (state, action) => ({
      ...state,
      draftSetMilestonesLoading: false,
      error: action.payload,
    }),

    getDrafttMilestonesRequest: (state) => ({
      ...state,
      getDraftMilestoneLoading: true,
      error: null,
    }),
    getDrafttMilestonesSuccess: (state) => ({
      ...state,
      getDraftMilestoneLoading: false,
    }),
    getDrafttMilestonesFailure: (state, action) => ({
      ...state,
      getDraftMilestoneLoading: false,
      error: action.payload,
    }),

    submitBidRequest: (state) => ({
      ...state,
      submitBidLoading: true,
      error: null,
    }),
    submitBidSuccess: (state) => ({
      ...state,
      submitBidLoading: false,
    }),
    submitBidFailure: (state, action) => ({
      ...state,
      submitBidLoading: false,
      error: action.payload,
    }),

    changeBidTypeRequest: (state) => ({
      ...state,
      changeBidTypeLoading: true,
      error: null,
    }),
    changeBidTypeSuccess: (state) => ({
      ...state,
      changeBidTypeLoading: false,
    }),
    changeBidTypeFailure: (state, action) => ({
      ...state,
      changeBidTypeLoading: false,
      error: action.payload,
    }),

    deleteDraftBidRequest: (state) => ({
      ...state,
      deleteDraftBidLoading: true,
      error: null,
    }),
    deleteDraftBidSuccess: (state) => ({
      ...state,
      deleteDraftBidLoading: false,
    }),
    deleteDraftBidFailure: (state, action) => ({
      ...state,
      deleteDraftBidLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  checkBidRequest,
  checkBidSuccess,
  checkBidFailure,
  createBidRequest,
  createBidSuccess,
  createBidFailure,
  projectDetailsRequest,
  projectDetailsSuccess,
  projectDetailsFailure,
  bidDetailsRequest,
  bidDetailsSuccess,
  bidDetailsFailure,
  rolesRequest,
  rolesSuccess,
  rolesFailure,
  setWorkersRequest,
  setWorkersSuccess,
  setWorkersFailure,
  draftSetWorkersRequest,
  draftSetWorkersSuccess,
  draftSetWorkersFailure,
  setMilestonesRequest,
  setMilestonesSuccess,
  setMilestonesFailure,
  draftSetMilestonesRequest,
  draftSetMilestonesSuccess,
  draftSetMilestonesFailure,
  submitBidRequest,
  submitBidSuccess,
  submitBidFailure,
  changeBidTypeRequest,
  changeBidTypeSuccess,
  changeBidTypeFailure,
  deleteDraftBidRequest,
  deleteDraftBidSuccess,
  deleteDraftBidFailure,
  getDrafttMilestonesRequest,
  getDrafttMilestonesSuccess,
  getDrafttMilestonesFailure,
} = createBid.actions;

export default createBid.reducer;
