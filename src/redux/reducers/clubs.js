import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
  loading: false,
  cardInfoLoading: false,
  email: null,
  isEmailVerified: false,
  clubCreateData: null,
  clubCreated: {},
  clubs: [],
  error: null,
  updateClubLoading: false,
  draftClub: {},
  saveDraftClubLoading: false,
  deleteDraftClubLoading: false,
  getDraftClubLoading: false,
};

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    registerClubEmailRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    registerClubEmailSuccess: (state, action) => ({
      ...state,
      loading: false,
      email: action.payload,
    }),
    registerClubEmailFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    getClubCreated: (state, action) => ({
      ...state,
      teamCreated: action.payload,
    }),
    setClubCreateData: (state, action) => ({
      ...state,
      clubCreateData: { ...state.clubCreateData, ...action.payload },
    }),
    clearClubCreateData: (state) => ({
      ...state,
      clubCreateData: null,
    }),
    getCardInfoReq: (state) => ({
      ...state,
      cardInfoLoading: true,
    }),
    getCardInfoErr: (state) => ({
      ...state,
      cardInfoLoading: false,
    }),
    getCardInfoSuccess: (state, action) => ({
      ...state,
      cardInfoLoading: false,
      cardData: action.payload,
    }),
    clearTeamCardData: (state) => ({
      ...state,
      cardData: null,
    }),
    getListReq: (state) => ({
      ...state,
      loading: true,
    }),
    getListErr: (state) => ({
      ...state,
      loading: false,
    }),
    storeSuccessData: (state, action) => {
      if (!action.payload?.data) return;
      // eslint-disable-next-line consistent-return
      return {
        ...state,
        currentPreview: action.payload?.data,
        listData:
          action.payload?.metadata?.current_page === 1
            ? action.payload?.data
            : [...state.listData, ...action.payload.data],
        metaData: action.payload?.metadata,
        loading: false,
      };
    },
    clearData: (state) => ({
      ...state,
      currentPreview: [],
      metaData: null,
      listData: [],
      users: [],
    }),
    getDraftClubRequest: (state) => ({
      ...state,
      getDraftClubLoading: true,
    }),
    getDraftClubSuccess: (state,action) => ({
      ...state,
      getDraftClubLoading: false,
      draftClub: action.payload,
    }),
    getDraftClubError: (state) => ({
      ...state,
      getDraftClubLoading: false,
    }),

    saveDraftClubRequest: (state) => ({
      ...state,
      saveDraftClubLoading: true,
    }),
    saveDraftClubError: (state) => ({
      ...state,
      saveDraftClubLoading: false,
    }),
    saveDraftClubSuccess: (state, action) => ({
      ...state,
      saveDraftClubLoading: false,
      draftClub: action.payload,
    }),

    deleteDraftClubRequest: (state) => ({
      ...state,
      deleteDraftClubLoading: true,
    }),
    deleteDraftClubSuccess: (state) => ({
      ...state,
      deleteDraftClubLoading: false,
    }),
    deleteDraftClubError: (state) => ({
      ...state,
      deleteDraftClubLoading: false,
    }),

    checkDraftClubRequest: (state) => ({
      ...state,
      saveDraftClubLoading: true,
    }),
    checkDraftClubError: (state) => ({
      ...state,
      saveDraftClubLoading: false,
    }),
    checkDraftClubSuccess: (state, action) => ({
      ...state,
      saveDraftClubLoading: false,
      draftClub: action.payload,
    }),
  },
});

export const {
  registerClubEmailRequest,
  registerClubEmailSuccess,
  registerClubEmailFailure,
  getClubCreated,
  setClubCreateData,
  clearClubCreateData,
  getCardInfoReq,
  getCardInfoErr,
  getCardInfoSuccess,
  storeSuccessData,
  clearData,
  clearTeamCardData,
  getListReq,
  getListErr,
  getDraftClubRequest,
  getDraftClubSuccess,
  getDraftClubError,
  saveDraftClubRequest,
  saveDraftClubError,
  saveDraftClubSuccess,
  checkDraftClubError,
  checkDraftClubRequest,
  checkDraftClubSuccess,
  deleteDraftClubRequest,
  deleteDraftClubSuccess,
  deleteDraftClubError,
} = clubSlice.actions;

export default clubSlice.reducer;
