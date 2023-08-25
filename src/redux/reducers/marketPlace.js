import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardData: null,
  currentPreview: [],
  metaData: null,
  listData: [],
  users: [],
  loading: false,
};

const marketPlaceSlice = createSlice({
  name: 'marketPlace',
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

    // Reducer to mark an item as favorite in the marketplace list.
    makeFavFromMarketplaceSuccess: (state, action) => {
      // Extract user_id, user_type, and _id from the action payload.
      const { user_id, user_type, _id } = action.payload;
      // Determine which property to match based on the presence of user_id and user_type.
      const propertyToMatch = user_id && user_type ? { user_id, user_type } : { _id };

      // Find the index of the item to update in the listData array.
      const index = state?.listData?.findIndex((item) =>
        Object.entries(propertyToMatch).every(([key, value]) => item[key] === value),
      );

      // If the item is found, update its is_favorite property and return the updated state.
      if (index !== -1) {
        const updatedItem = { ...state.listData[index], is_favorite: true };
        const updatedListData = [...state.listData];
        updatedListData[index] = updatedItem;

        return {
          ...state,
          listData: updatedListData,
        };
      }

      // If the item is not found, return the current state.
      return state;
    },

    // Reducer to remove an item from favorites in the marketplace list.
    removeFavFromMarketplaceSuccess: (state, action) => {
      // Extract user_id and _id from the action payload.
      const { user_id, _id } = action.payload;

      // Determine which property to match based on the presence of user_id.
      const propertyToMatch = user_id ? { user_id } : { _id };

      // Find the index of the item to update in the listData array.
      const index = state?.listData?.findIndex((item) =>
        Object.entries(propertyToMatch).every(([key, value]) => item[key] === value),
      );

      // If the item is found, update its is_favorite property and return the updated state.
      if (index !== -1) {
        const updatedItem = { ...state.listData[index], is_favorite: false };
        const updatedListData = [...state.listData];
        updatedListData[index] = updatedItem;

        return {
          ...state,
          listData: updatedListData,
        };
      }

      // If the item is not found, return the current state.
      return state;
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
  makeFavFromMarketplaceSuccess,
  removeFavFromMarketplaceSuccess,
  getCardInfoSuccess,
  getListProjectsSuccess,
  getUsersSuccess,
  clearData,
  getListReq,
  getListErr,
} = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;
