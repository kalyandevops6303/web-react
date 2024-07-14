import { createSelector } from '@reduxjs/toolkit';

const supportSelector = (state) => state.support;

const selectSupportList = createSelector(supportSelector, (support) => support.supportList);

const selectDeleteRequestLoading = createSelector(supportSelector, (support => support.deleteRequestLoading));

export {
    selectSupportList,
    selectDeleteRequestLoading
}