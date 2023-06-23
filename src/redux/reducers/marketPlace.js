import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
};

const marketPlaceSlice = createSlice({
  name: 'marketPlace',
  initialState,
  reducers: {
    getCardInfoSuccess: (state, action) => ({
      ...state,
      cardData: action.payload,
    }),
    getListProjectsSuccess: (state, action) => ({
      ...state,
      currentPreview: action.payload.data,
      listData:
        action.payload.metadata.current_page === 1 ? action.payload.data : [...state.listData, ...action.payload.data],
      metaData: action.payload.metadata,
    }),
    getUsersSuccess: (state, action) => ({
      ...state,
      currentPreview: action.payload.data,
      listData:
        action.payload.metadata.current_page === 1 ? action.payload.data : [...state.listData, ...action.payload.data],
      metaData: action.payload.metadata,
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

export const { getCardInfoSuccess, getListProjectsSuccess, getUsersSuccess, clearData } = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;
