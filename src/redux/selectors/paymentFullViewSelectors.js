import { createSelector } from '@reduxjs/toolkit';

const paymentFullViewSelector = (state) => state.paymentFullView;

export const paymentMetrics = createSelector(
  paymentFullViewSelector,
  (paymentFullView) => paymentFullView.paymentMetrics,
);

export const paymentMetricsLoading = createSelector(
  paymentFullViewSelector,
  (paymentFullView) => paymentFullView.paymentMetricsLoading,
);

export const paymentHistory = createSelector(
  paymentFullViewSelector,
  (paymentFullView) => paymentFullView.paymentHistory,
);

export const paymentHistoryLoading = createSelector(
  paymentFullViewSelector,
  (paymentFullView) => paymentFullView.paymentHistoryLoading,
);
