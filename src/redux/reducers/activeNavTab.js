import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: '',
};

const activeNavSTablice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActiveNavTab: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveNavTab } = activeNavSTablice.actions;

export default activeNavSTablice.reducer;
