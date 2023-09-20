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
  },
});

export const { getCardInfoSuccess, storeSuccessData, getListErr, getListReq } = projectSlice.actions;

export default projectSlice.reducer;
