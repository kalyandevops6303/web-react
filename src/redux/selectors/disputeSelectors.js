import { createSelector } from '@reduxjs/toolkit';

const staticSelector = (state) => state.staticData;

// eslint-disable-next-line import/prefer-default-export
export const raiseDisputeLoading = createSelector(staticSelector, (staticData) => staticData.raiseDisputeLoading);
