import { createSelector } from '@reduxjs/toolkit';

const delegateSelector = (state) => state.delegate;

export const checkIsInviteDelegateModalVisible = createSelector(
  delegateSelector,
  (delegate) => delegate.isInviteDelegateModalVisible,
);
export const delegateInvitationStatusData = createSelector(
  delegateSelector,
  (delegate) => delegate.delegateInvitationStatusData,
);

export const checkIsDelegateModeModalVisible = createSelector(
  delegateSelector,
  (delegate) => delegate.isDelegateModeModalVisible,
);

export const selectDelegateLoading = createSelector(delegateSelector, (delegate) => delegate.isLoading);
