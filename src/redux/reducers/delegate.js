import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delegateProfile: {},
  isLoading: false,
  error: null,
  isDelegate: false,
  delegateInvitationStatusData: [],
  isInviteDelegateModalVisible: false,
  isDelegateModeModalVisible: false,
};

const delegateSlice = createSlice({
  name: 'delegate',
  initialState,
  reducers: {
    // sign up delegate
    signUpDelegateRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    signUpDelegateSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      error: null,
      delegateProfile: action.payload,
    }),
    signUpDelegateFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    // sign in delegate
    signInDelegateRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    signInDelegateSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      error: null,
      isDelegate: true,
      delegateProfile: action.payload,
    }),
    signInDelegateFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    // invite delegate
    inviteDelegateRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    inviteDelegateSuccess: (state) => ({
      ...state,
      isLoading: false,
      error: null,
    }),
    inviteDelegateFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),

    // invite delegate
    delegateInvitationStatusRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    delegateInvitationStatusSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      error: null,
      delegateInvitationStatusData: [...state.delegateInvitationStatusData, ...action.payload],
    }),
    delegateInvitationStatusFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      delegateInvitationStatusData: null,
    }),

    toggleAddDelegateModal: (state, action) => ({
      ...state,
      isInviteDelegateModalVisible: action.payload,
    }),
    toggleDelegateModeModal: (state, action) => ({
      ...state,
      isDelegateModeModalVisible: action.payload,
    }),
  },
});

export const {
  inviteDelegateRequest,
  inviteDelegateSuccess,
  inviteDelegateFailure,
  toggleAddDelegateModal,
  toggleDelegateModeModal,
  signUpDelegateRequest,
  signUpDelegateSuccess,
  signUpDelegateFailure,
  signInDelegateFailure,
  signInDelegateRequest,
  signInDelegateSuccess,
  delegateInvitationStatusRequest,
  delegateInvitationStatusSuccess,
  delegateInvitationStatusFailure,
} = delegateSlice.actions;

export default delegateSlice.reducer;
