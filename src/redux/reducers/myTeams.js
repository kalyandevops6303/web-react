import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
  loading: false,
};

const myTeamsSlice = createSlice({
  name: 'myTeams',
  initialState,
  reducers: {
    getCardInfoSuccess: (state, action) => ({
      ...state,
      cardData: action.payload,
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

export const { getCardInfoSuccess, storeSuccessData, clearData, getListReq, getListErr } = myTeamsSlice.actions;

export default myTeamsSlice.reducer;
