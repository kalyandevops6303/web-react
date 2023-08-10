import { createSelector } from '@reduxjs/toolkit';

const authSelector = (state) => state.auth;

export const selectAuthLoading = createSelector(authSelector, (auth) => auth.loading);

export const selectAuthUserData = createSelector(authSelector, (auth) => auth.userData);

export const selectIsTeamLoggedIn = createSelector(authSelector, (auth) => auth.isTeamLoggedIn);

export const selectIsLoggedIn = createSelector(authSelector, (auth) => auth.isLoggedIn);

export const selectEmail = createSelector(authSelector, (auth) => auth.email);

export const selectIsPhoneVerified = createSelector(authSelector, (auth) => auth.isPhoneVerified);

export const selectIsEmailVerified = createSelector(authSelector, (auth) => auth.isEmailVerified);

export const selectIsPasswordSet = createSelector(authSelector, (auth) => auth.isPasswordSet);

export const selectMobile = createSelector(authSelector, (auth) => auth.phone);

export const selectUserType = createSelector(authSelector, (auth) => auth.userType);
