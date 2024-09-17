import { createSelector } from '@reduxjs/toolkit';

const reportSelector = (state) => state.reports;

export const selectReportLoading = createSelector(reportSelector, (reports) => reports.reportLoading);

export const selectReportDetails = createSelector(reportSelector, (reports) => reports.reportDetails);

export const selectReportError = createSelector(reportSelector, (reports) => reports.reportError);

export const selectCheckReportLoading = createSelector(reportSelector, (reports) => reports.checkReportLoading);

export const selectAlreadyReported = createSelector(reportSelector, (reports) => reports.alreadyReported);