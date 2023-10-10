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

const myTeamsSlice = createSlice({
  name: 'myTeams',
  initialState,
  reducers: {
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
    clearCardData: (state) => ({
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
  },
});

export const {
  getCardInfoReq,
  getCardInfoErr,
  getCardInfoSuccess,
  storeSuccessData,
  clearData,
  clearCardData,
  getListReq,
  getListErr,
} = myTeamsSlice.actions;

export default myTeamsSlice.reducer;
