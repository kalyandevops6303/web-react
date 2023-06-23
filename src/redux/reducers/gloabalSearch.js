import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  searchData: [],
  currentFilterData: [],
  currentFilterType: '',
  currentFilterMetadata: null,
  currentFilterPreview: null,
};

const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
    handleQuery: (state, action) => ({
      ...state,
      query: action.payload,
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

export const { getSearchSuccess, handleQuery, currentSearchSuccess } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;
