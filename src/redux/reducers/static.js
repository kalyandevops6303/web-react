import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  talentRoles: null,
  talentRolesLoading: false,
  languages: null,
  languagesLoading: false,
  countries: null,
  countriesLoading: false,
  states: null,
  statesLoading: false,
  cities: null,
  citiesLoading: false,
  institutes: null,
  institutesLoading: false,
  educations: null,
  educationsLoading: false,
  tools: null,
  toolsLoading: false,
  skills: null,
  skillsLoading: false,
  timezones: null,
  timezonesLoading: false,
  currencies: null,
  currenciesLoading: false,
  companyIndustries: null,
  companyIndustriesLoading: false,
  projectAreas: null,
  projectAreasLoading: false,
  error: null,
};

const staticDataSlice = createSlice({
  name: 'staticData',
  initialState,
  reducers: {
    talentRolesRequest: (state) => ({
      ...state,
      talentRolesLoading: true,
      error: null,
    }),
    talentRolesSuccess: (state, action) => ({
      ...state,
      talentRolesLoading: false,
      talentRoles: action.payload,
    }),
    talentRolesFailure: (state, action) => ({
      ...state,
      talentRolesLoading: false,
      error: action.payload,
    }),

    languagesRequest: (state) => ({
      ...state,
      languagesLoading: true,
      error: null,
    }),
    languagesSuccess: (state, action) => ({
      ...state,
      languagesLoading: false,
      languages: action.payload,
    }),
    languagesFailure: (state, action) => ({
      ...state,
      languagesLoading: false,
      error: action.payload,
    }),

    countriesRequest: (state) => ({
      ...state,
      countriesLoading: true,
      error: null,
    }),
    countriesSuccess: (state, action) => ({
      ...state,
      countriesLoading: false,
      countries: action.payload,
    }),
    countriesFailure: (state, action) => ({
      ...state,
      countriesLoading: false,
      error: action.payload,
    }),

    statesRequest: (state) => ({
      ...state,
      statesLoading: true,
      error: null,
    }),
    statesSuccess: (state, action) => ({
      ...state,
      statesLoading: false,
      states: action.payload,
    }),
    statesFailure: (state, action) => ({
      ...state,
      statesLoading: false,
      error: action.payload,
    }),

    citiesRequest: (state) => ({
      ...state,
      citiesLoading: true,
      error: null,
    }),
    citiesSuccess: (state, action) => ({
      ...state,
      citiesLoading: false,
      cities: action.payload,
    }),
    citiesFailure: (state, action) => ({
      ...state,
      citiesLoading: false,
      error: action.payload,
    }),

    institutesRequest: (state) => ({
      ...state,
      institutesLoading: true,
      error: null,
    }),
    institutesSuccess: (state, action) => ({
      ...state,
      institutesLoading: false,
      institutes: action.payload,
    }),
    institutesFailure: (state, action) => ({
      ...state,
      institutesLoading: false,
      error: action.payload,
    }),

    educationsRequest: (state) => ({
      ...state,
      educationsLoading: true,
      error: null,
    }),
    educationsSuccess: (state, action) => ({
      ...state,
      educationsLoading: false,
      educations: action.payload,
    }),
    educationsFailure: (state, action) => ({
      ...state,
      educationsLoading: false,
      error: action.payload,
    }),

    toolsRequest: (state) => ({
      ...state,
      toolsLoading: true,
      error: null,
    }),
    toolsSuccess: (state, action) => ({
      ...state,
      toolsLoading: false,
      tools: action.payload,
    }),
    toolsFailure: (state, action) => ({
      ...state,
      toolsLoading: false,
      error: action.payload,
    }),

    skillsRequest: (state) => ({
      ...state,
      skillsLoading: true,
      error: null,
    }),
    skillsSuccess: (state, action) => ({
      ...state,
      skillsLoading: false,
      skills: action.payload,
    }),
    skillsFailure: (state, action) => ({
      ...state,
      skillsLoading: false,
      error: action.payload,
    }),

    timezonesRequest: (state) => ({
      ...state,
      timezonesLoading: true,
      error: null,
    }),
    timezonesSuccess: (state, action) => ({
      ...state,
      timezonesLoading: false,
      timezones: action.payload,
    }),
    timezonesFailure: (state, action) => ({
      ...state,
      timezonesLoading: false,
      error: action.payload,
    }),

    currenciesRequest: (state) => ({
      ...state,
      currenciesLoading: true,
      error: null,
    }),
    currenciesSuccess: (state, action) => ({
      ...state,
      currenciesLoading: false,
      currencies: action.payload,
    }),
    currenciesFailure: (state, action) => ({
      ...state,
      currenciesLoading: false,
      error: action.payload,
    }),

    companyIndustriesRequest: (state) => ({
      ...state,
      companyIndustriesLoading: true,
      error: null,
    }),
    companyIndustriesSuccess: (state, action) => ({
      ...state,
      companyIndustriesLoading: false,
      companyIndustries: action.payload,
    }),
    companyIndustriesFailure: (state, action) => ({
      ...state,
      companyIndustriesLoading: false,
      error: action.payload,
    }),

    projectAreasRequest: (state) => ({
      ...state,
      projectAreasLoading: true,
      error: null,
    }),
    projectAreasSuccess: (state, action) => ({
      ...state,
      projectAreasLoading: false,
      projectAreas: action.payload,
    }),
    projectAreasFailure: (state, action) => ({
      ...state,
      projectAreasLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  talentRolesRequest,
  talentRolesSuccess,
  talentRolesFailure,
  languagesRequest,
  languagesSuccess,
  languagesFailure,
  countriesRequest,
  countriesSuccess,
  countriesFailure,
  statesRequest,
  statesSuccess,
  statesFailure,
  citiesRequest,
  citiesSuccess,
  citiesFailure,
  institutesRequest,
  institutesSuccess,
  institutesFailure,
  educationsRequest,
  educationsSuccess,
  educationsFailure,
  toolsRequest,
  toolsSuccess,
  toolsFailure,
  skillsRequest,
  skillsSuccess,
  skillsFailure,
  timezonesRequest,
  timezonesSuccess,
  timezonesFailure,
  currenciesRequest,
  currenciesSuccess,
  currenciesFailure,
  companyIndustriesRequest,
  companyIndustriesSuccess,
  companyIndustriesFailure,
  projectAreasRequest,
  projectAreasSuccess,
  projectAreasFailure,
} = staticDataSlice.actions;

export default staticDataSlice.reducer;
