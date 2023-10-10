import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
  loading: false,
  cardInfoLoading: false,
};

const marketPlaceSlice = createSlice({
  name: 'marketPlace',
  initialState,
  reducers: {
    getCardInfoRequest: (state) => ({
      ...state,
      cardInfoLoading: true,
    }),
    getCardInfoError: (state) => ({
      ...state,
      cardInfoLoading: false,
    }),
    getCardInfoSuccess: (state, action) => ({
      ...state,
      cardInfoLoading: false,
      cardData: action.payload,
    }),
    clearMarketplaceCardData: (state) => ({
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
    getListProjectsSuccess: (state, action) => ({
      ...state,
      currentPreview: action.payload.data,
      listData:
        action.payload.metadata.current_page === 1 ? action.payload.data : [...state.listData, ...action.payload.data],
      metaData: action.payload.metadata,
      loading: false,
    }),
    getUsersSuccess: (state, action) => ({
      ...state,
      currentPreview: action.payload.data,
      listData:
        action.payload.metadata.current_page === 1 ? action.payload.data : [...state.listData, ...action.payload.data],
      metaData: action.payload.metadata,
      loading: false,
    }),

    clearData: (state) => ({
      ...state,
      currentPreview: [],
      metaData: null,
      listData: [],
      users: [],
    }),
  },
});

export const {
  getCardInfoSuccess,
  getCardInfoRequest,
  getCardInfoError,
  clearMarketplaceCardData,
  getListProjectsSuccess,
  getUsersSuccess,
  clearData,
  getListReq,
  getListErr,
} = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;
