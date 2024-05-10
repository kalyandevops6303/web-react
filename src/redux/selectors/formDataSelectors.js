import { createSelector } from '@reduxjs/toolkit';

const formDataSelector = (state) => state.formData;

const formData = createSelector(formDataSelector, (state) => state.formData);

const formDocuments = createSelector(formDataSelector, (state) => state.formDocuments);

export { formData, formDocuments };
