import { createSelector } from '@reduxjs/toolkit';

const ratingSelector = (state) => state.rating;

export const giveRatingLoading = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);

export const yourSubmittedRatingLoading = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);

export const yourSubmittedRating = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);

export const yourRatingLoading = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);

export const yourRating = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);
