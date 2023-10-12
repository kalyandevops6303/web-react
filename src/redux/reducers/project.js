import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
  loading: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getCardInfoReq: (state) => ({
      ...state,
      cardInfoLoading: true,
    }),
    getCardInfoSuccess: (state, action) => ({
      ...state,
      cardData: action.payload,
      cardInfoLoading: false,
    }),
    getCardInfoErr: (state) => ({
      ...state,
      cardInfoLoading: false,
    }),
    clearProjectCardData: (state) => ({
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
    storeSuccessData: (state, action) => ({
      ...state,
      currentPreview: action.payload?.data,
      listData:
        action.payload?.metadata?.current_page === 1
          ? action.payload?.data
          : [...state.listData, ...action.payload.data],
      metaData: action.payload?.metadata,
      loading: false,
    }),

    clearData: (state) => ({
      ...state,
      currentPreview: [],
      metaData: null,
      listData: [],
      users: [],
      loading: false,
    }),
  },
});

export const {
  getCardInfoReq,
  getCardInfoErr,
  getCardInfoSuccess,
  storeSuccessData,
  getListErr,
  getListReq,
  clearData,
  clearProjectCardData,
} = projectSlice.actions;

export default projectSlice.reducer;
