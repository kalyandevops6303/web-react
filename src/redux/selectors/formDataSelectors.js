import { createSelector } from '@reduxjs/toolkit';

const formDataSelector = (state) => state.formData;

const formData = createSelector(formDataSelector, (state) => state.formData);

const formDocuments = createSelector(formDataSelector, (state) => state.formDocuments);

const formImage = createSelector(formDataSelector, (state) => state.formImage);

const resumeParsed = createSelector(formDataSelector, (state) => state.parseResume);

const isFormImageRemoved = createSelector(formDataSelector, (state) => state.isFormImageRemoved);

const confirmSaveForLater = createSelector(formDataSelector, (state) => state.confirmSaveForLater);

const navigatingRoute = createSelector(formDataSelector, (state) => state.navigatingRoute);

export { formData, formDocuments, formImage, resumeParsed, isFormImageRemoved, confirmSaveForLater, navigatingRoute };
