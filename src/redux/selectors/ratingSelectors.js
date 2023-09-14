import { createSelector } from '@reduxjs/toolkit';

const ratingSelector = (state) => state.rating;

export const giveRatingLoading = createSelector(ratingSelector, (rating) => rating.giveRatingLoading);

export const yourSubmittedRatingLoading = createSelector(ratingSelector, (rating) => rating.yourSubmittedRatingLoading);

export const yourSubmittedRating = createSelector(ratingSelector, (rating) => rating.yourSubmittedRating);

export const yourRatingLoading = createSelector(ratingSelector, (rating) => rating.yourRatingLoading);

export const yourRating = createSelector(ratingSelector, (rating) => rating.yourRating);
