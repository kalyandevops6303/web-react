import { createSelector } from '@reduxjs/toolkit';

const staticSelector = (state) => state.staticData;

export const talentRoles = createSelector(staticSelector, (staticData) => staticData.talentRoles);

export const talentRolesLoading = createSelector(staticSelector, (staticData) => staticData.talentRolesLoading);

export const languages = createSelector(staticSelector, (staticData) => staticData.languages);

export const languagesLoading = createSelector(staticSelector, (staticData) => staticData.languagesLoading);

export const countries = createSelector(staticSelector, (staticData) => staticData.countries);

export const countriesLoading = createSelector(staticSelector, (staticData) => staticData.countriesLoading);

export const states = createSelector(staticSelector, (staticData) => staticData.states);

export const statesLoading = createSelector(staticSelector, (staticData) => staticData.statesLoading);

export const cities = createSelector(staticSelector, (staticData) => staticData.cities);

export const citiesLoading = createSelector(staticSelector, (staticData) => staticData.citiesLoading);

export const institutes = createSelector(staticSelector, (staticData) => staticData.institutes);

export const institutesLoading = createSelector(staticSelector, (staticData) => staticData.institutesLoading);

export const educations = createSelector(staticSelector, (staticData) => staticData.educations);

export const educationsLoading = createSelector(staticSelector, (staticData) => staticData.educationsLoading);

export const toolsList = createSelector(staticSelector, (staticData) => staticData.tools);

export const toolsLoading = createSelector(staticSelector, (staticData) => staticData.toolsLoading);

export const skillsList = createSelector(staticSelector, (staticData) => staticData.skills);

export const skillsLoading = createSelector(staticSelector, (staticData) => staticData.skillsLoading);

export const certificatesList = createSelector(staticSelector, (staticData) => staticData.certificates);

export const certificatesLoading = createSelector(staticSelector, (staticData) => staticData.certificatesLoading);

export const timezones = createSelector(staticSelector, (staticData) => staticData.timezones);

export const timezonesLoading = createSelector(staticSelector, (staticData) => staticData.timezonesLoading);

export const currencies = createSelector(staticSelector, (staticData) => staticData.currencies);

export const currenciesLoading = createSelector(staticSelector, (staticData) => staticData.currenciesLoading);

export const companyIndustries = createSelector(staticSelector, (staticData) => staticData.companyIndustries);

export const companyIndustriesLoading = createSelector(
  staticSelector,
  (staticData) => staticData.companyIndustriesLoading,
);

export const projectAreas = createSelector(staticSelector, (staticData) => staticData.projectAreas);

export const projectAreasLoading = createSelector(staticSelector, (staticData) => staticData.projectAreasLoading);

export const disputeTypes = createSelector(staticSelector, (staticData) => staticData.disputeTypes);

export const disputeTypesLoading = createSelector(staticSelector, (staticData) => staticData.disputeTypesLoading);
