import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const favUnfav = createSlice({
  name: 'favUnfav',
  initialState,
  reducers: {
    favUnfavRequest: (state) => ({
      ...state,
      loading: true,
    }),
    favUnfavError: (state) => ({
      ...state,
      loading: false,
    }),
    favUnfavSuccess: (state) => ({
      ...state,
      loading: false,
    }),
  },
});
export const { favUnfavSuccess, favUnfavRequest, favUnfavError } = favUnfav.actions;

export default favUnfav.reducer;
