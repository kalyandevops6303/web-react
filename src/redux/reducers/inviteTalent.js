import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bestTalents: {
    metadata: {
      current_page: 10,
      page_size: 10,
      total_records: 224,
      has_next_page: true,
    },
    data: [
      {
        user_id: '64941d7426d790256ee111ee',
        first_name: 'John',
        image_uri: '',
        last_name: 'Wilson',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't217@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649905c326d790256ee12f34',
        first_name: 'Kaveri',
        image_uri: '',
        last_name: 'Jain',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't221@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '64995678301dc571312710a0',
        first_name: 'Khushbu',
        image_uri: '',
        last_name: 'Wowlabz',
        projects_worked_on_count: 0,
        rating: 0,
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '64999742aaf350be6efaae33',
        first_name: 'Hiya',
        image_uri: '',
        last_name: 'Sharma',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't224@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649ae34baaf350be6efab04d',
        first_name: 'Rehan',
        image_uri: '',
        last_name: 'GDUI',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't300@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649c15d4e7aaf913f47e9ea4',
        first_name: 'Khushbu',
        image_uri: '',
        last_name: 'Mehta',
        projects_worked_on_count: 0,
        rating: 0,
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649c34bca624bda718841cbb',
        first_name: 'ridi',
        image_uri: '',
        last_name: 'jain',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't316@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649c56870fe0b72f035f82ed',
        first_name: 'Tanvi',
        image_uri: '',
        last_name: 'Mehtaa',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 'c231@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649e5edf1f87e6960e894b2b',
        first_name: 'Vini',
        image_uri: '',
        last_name: 'Singh',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't315@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
      {
        user_id: '649e945392e73130b4e6eaa8',
        first_name: 'Arpit',
        image_uri: '',
        last_name: 'Verma',
        projects_worked_on_count: 0,
        rating: 0,
        user_details: {
          email: 't251@yopmail.com',
        },
        total_matches: 0,
        match_percentage: 0,
        total_time_overlap: 4,
      },
    ],
  },
  bestTalentsLoading: false,
  favoriteTalents: null,
  favoriteTalentsLoading: false,
  almaMaterTalents: null,
  almaMaterTalentsLoading: false,
  inviteTalentsLoading: false,
  error: null,
};

const inviteTalentSlice = createSlice({
  name: 'inviteTalent',
  initialState,
  reducers: {
    clearCreateProjectData: (state) => ({
      ...state,
      bestTalents: null,
      bestTalentsLoading: false,
      favoriteTalents: null,
      favoriteTalentsLoading: false,
      almaMaterTalents: null,
      almaMaterTalentsLoading: false,
    }),

    bestTalentsRequest: (state) => ({
      ...state,
      bestTalentsLoading: true,
      error: null,
    }),
    bestTalentsSuccess: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      bestTalents: action.payload,
    }),
    bestTalentsFailure: (state, action) => ({
      ...state,
      bestTalentsLoading: false,
      error: action.payload,
    }),

    favoriteTalentsRequest: (state) => ({
      ...state,
      favoriteTalentsLoading: true,
      error: null,
    }),
    favoriteTalentsSuccess: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      favoriteTalents: action.payload,
    }),
    favoriteTalentsFailure: (state, action) => ({
      ...state,
      favoriteTalentsLoading: false,
      error: action.payload,
    }),

    almaMaterTalentsRequest: (state) => ({
      ...state,
      almaMaterTalentsLoading: true,
      error: null,
    }),
    almaMaterTalentsSuccess: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      almaMaterTalents: action.payload,
    }),
    almaMaterTalentsFailure: (state, action) => ({
      ...state,
      almaMaterTalentsLoading: false,
      error: action.payload,
    }),

    inviteTalentsRequest: (state) => ({
      ...state,
      inviteTalentsLoading: true,
      error: null,
    }),
    inviteTalentsSuccess: (state) => ({
      ...state,
      inviteTalentsLoading: false,
    }),
    inviteTalentsFailure: (state, action) => ({
      ...state,
      inviteTalentsLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  clearCreateProjectData,
  bestTalentsRequest,
  bestTalentsSuccess,
  bestTalentsFailure,
  favoriteTalentsRequest,
  favoriteTalentsSuccess,
  favoriteTalentsFailure,
  almaMaterTalentsRequest,
  almaMaterTalentsSuccess,
  almaMaterTalentsFailure,
  inviteTalentsRequest,
  inviteTalentsSuccess,
  inviteTalentsFailure,
} = inviteTalentSlice.actions;

export default inviteTalentSlice.reducer;
