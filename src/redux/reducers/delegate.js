import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delegateProfile: {},
  isLoading: false,
  error: null,
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

    // invite delegate
    inviteDelegateRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    inviteDelegateSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      delegateProfile: action.payload,
    }),
    inviteDelegateFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
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
} = delegateSlice.actions;

export default delegateSlice.reducer;
