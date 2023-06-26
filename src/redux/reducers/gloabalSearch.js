import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  resultQuery: '',
  searchData: [],
  currentFilterData: [],
  currentFilterType: '',
  currentFilterMetadata: null,
  currentFilterPreview: null,
  loading: false,
};

const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
    handleQuery: (state, action) => ({
      ...state,
      query: action.payload,
      resultQuery: action.payload,
    }),
    clearQuery: (state) => ({
      ...state,
      query: '',
    }),

    getSerachReq: (state) => ({
      ...state,
      loading: true,
    }),
    getSerachErr: (state) => ({
      ...state,
      loading: false,
    }),

    getSearchSuccess: (state, action) => {
      const scope = action.payload && action.payload.scope && action.payload.scope.toLowerCase();
      const searchResult = scope && action.payload[scope];

      if (scope && searchResult) {
        return {
          ...state,
          searchData: action.payload,
          currentFilterData:
            searchResult.metadata && searchResult.metadata.current_page === 1
              ? searchResult.data
              : [...state.currentFilterData, ...searchResult.data],
          currentFilterType: action.payload.scope,
          currentFilterMetadata: searchResult.metadata,
          currentFilterPreview: searchResult.data,
          loading: false,
        };
      }

      return state;
    },

    currentSearchSuccess: (state, action) => {
      const scope = action.payload && action.payload.scope && action.payload.scope.toLowerCase();
      const searchResult = scope && action.payload[scope];

      if (scope && searchResult) {
        return {
          ...state,
          currentFilterData: [...state.currentFilterData, ...searchResult.data],
          currentFilterType: action.payload.scope,
          currentFilterMetadata: searchResult.metadata,
          currentFilterPreview: searchResult.data,
        };
      }

      return state;
    },
  },
});

export const { getSearchSuccess, handleQuery, currentSearchSuccess, getSerachReq, getSerachErr, clearQuery } =
  globalSearchSlice.actions;

export default globalSearchSlice.reducer;
