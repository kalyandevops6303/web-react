import { createSelector } from '@reduxjs/toolkit';

const formDataSelector = (state) => state.formData;

const formData = createSelector(formDataSelector, (state) => state.formData);

const formDocuments = createSelector(formDataSelector, (state) => state.formDocuments);

const formImage = createSelector(formDataSelector, (state) => state.formImage);

const isFormImageRemoved = createSelector(formDataSelector, (state) => state.isFormImageRemoved);

export { formData, formDocuments, formImage, isFormImageRemoved };
