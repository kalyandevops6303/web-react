import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unreadMsgCount: 0,
  unreadMsgCountLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    unreadMsgCountRequest: (state) => ({
      ...state,
      unreadMsgCountLoading: true,
      error: null,
    }),
    setUnreadMsgCount: (state, action) => ({
      ...state,
      unreadMsgCount: action.payload,
      unreadMsgCountLoading: false,
    }),
    unreadMsgCountSuccess: (state) => ({
      ...state,
      unreadMsgCount: state.unreadMsgCount + 1,
      unreadMsgCountLoading: false,
    }),
    unreadMsgCountFailure: (state, action) => ({
      ...state,
      unreadMsgCountLoading: false,
      error: action.payload,
    }),

    clearUnreadMsgCountData: (state) => ({
      ...state,
      unreadMsgCount: 0,
      unreadMsgCountLoading: false,
    }),
  },
});

export const {
  unreadMsgCountRequest,
  setUnreadMsgCount,
  unreadMsgCountSuccess,
  unreadMsgCountFailure,
  clearUnreadMsgCountData,
} = chatSlice.actions;

export default chatSlice.reducer;
