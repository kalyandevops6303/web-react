import { createSelector } from '@reduxjs/toolkit';

const favUnfavSelector = (state) => state.favUnfav;

const selectFavUnfavLoading = createSelector(favUnfavSelector, (state) => state.loading);
export default selectFavUnfavLoading;
