import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {},
  userRecentProject: [],
  userReview: [],
  isLoading: false,
  reportLoading: false,
  publicTeamMembers: null,
  publicTeamMembersLoading: false,
  error: null,
  isAddDelegateModalVisible: false,
  isDelegateModeModalVisible: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    getProfileSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      userProfile: action.payload,
    }),
    getProfileFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    favUnfavReq: (state) => ({
      ...state,
      favUnfavLoading: true,
    }),
    makeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: true },
      favUnfavLoading: false,
    }),
    favUnfavError: (state) => ({
      ...state,
      favUnfavLoading: false,
    }),
    makeTeamMemberSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_team_member: true },
    }),
    removeFavSuccess: (state) => ({
      ...state,
      userProfile: { ...state.userProfile, is_favourite: false },
      favUnfavLoading: false,
    }),

    getRecentProjectRequest: (state) => ({
      ...state,
      isRecentProjectLoading: true,
      error: null,
    }),
    getRecentProjectSuccess: (state, action) => ({
      ...state,
      isRecentProjectLoading: false,
      userRecentProjectCurrentPreview: action.payload.data,
      userRecentProject:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.userRecentProject, ...action.payload.data],
      userRecentProjectMetaData: action.payload.metadata,
    }),
    getRecentProjectFailure: (state, action) => ({
      ...state,
      isRecentProjectLoading: false,
      error: action.payload,
    }),

    getReviewRequest: (state) => ({
      ...state,
      isReviewLoading: true,
      error: null,
    }),
    getReviewSuccess: (state, action) => ({
      ...state,
      isReviewLoading: false,
      userReviewCurrentPreview: action.payload.data,
      userReview:
        action.payload.metadata.current_page === 1
          ? action.payload.data
          : [...state.userReview, ...action.payload.data],
      userReviewMetaData: action.payload.metadata,
    }),
    getReviewFailure: (state, action) => ({
      ...state,
      isReviewLoading: false,
      error: action.payload,
    }),

    reportRequest: (state) => ({
      ...state,
      reportLoading: true,
      error: null,
    }),
    reportSuccess: (state) => ({
      ...state,
      reportLoading: false,
    }),
    reportFailure: (state) => ({
      ...state,
      reportLoading: false,
    }),

    publicTeamMembersRequest: (state) => ({
      ...state,
      publicTeamMembersLoading: true,
      error: null,
    }),
    publicTeamMembersSuccess: (state, action) => ({
      ...state,
      publicTeamMembersLoading: false,
      publicTeamMembers: action.payload,
    }),
    publicTeamMembersFailure: (state) => ({
      ...state,
      publicTeamMembersLoading: false,
    }),

    clearPublicTeamMembers: (state) => ({
      ...state,
      publicTeamMembers: null,
    }),

    clearData: (state) => ({
      ...state,
      userProfile: {},
      isLoading: false,
    }),

    // delegate

    toggleAddDelegateModal: (state, action) => ({
      ...state,
      isAddDelegateModalVisible: action.payload,
    }),
    toggleDelegateModeModal: (state, action) => ({
      ...state,
      isDelegateModeModalVisible: action.payload,
    }),
  },
});

export const {
  getProfileRequest,
  makeTeamMemberSuccess,
  getProfileSuccess,
  getProfileFailure,
  favUnfavReq,
  makeFavSuccess,
  favUnfavError,
  clearData,
  removeFavSuccess,
  getRecentProjectFailure,
  getRecentProjectRequest,
  getRecentProjectSuccess,
  getReviewRequest,
  getReviewSuccess,
  getReviewFailure,
  reportRequest,
  reportSuccess,
  reportFailure,
  publicTeamMembersRequest,
  publicTeamMembersSuccess,
  publicTeamMembersFailure,
  clearPublicTeamMembers,
  toggleAddDelegateModal,
  toggleDelegateModeModal,
  isDelegateModeModalVisible,
} = profileSlice.actions;

export default profileSlice.reducer;
