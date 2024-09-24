import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Bookmark, NavbarLayoutState } from '@src/types';
import axios from 'axios';

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {
  const response = await axios.get('/api/bookmarks/data');
  return {
    data: response.data.suggestions,
    bookmarks: response.data.bookmarks,
  };
});

export const updateBookmarked = createAsyncThunk<string, string>('layout/updateBookmarked', async (id) => {
  await axios.post('/api/bookmarks/update', { id });
  return id;
});

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    query: '',
    bookmarks: [],
    suggestions: [],
  } as NavbarLayoutState,
  reducers: {
    handleSearchQuery: (state: NavbarLayoutState, action: { payload: string }) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBookmarks.fulfilled,
        (state: NavbarLayoutState, action: { payload: { data: Bookmark[]; bookmarks: Bookmark[] } }) => {
          state.suggestions = action.payload.data;
          state.bookmarks = action.payload.bookmarks;
        },
      )
      .addCase(updateBookmarked.fulfilled, (state: NavbarLayoutState, action) => {
        const objectToUpdate = state.suggestions.find((item) => item.id === action.payload);
        if (!objectToUpdate) return;
        objectToUpdate.isBookmarked = !objectToUpdate.isBookmarked;

        // ** Get index to add or remove bookmark from array
        const bookmarkIndex = state.bookmarks.findIndex((x) => x.id === action.payload);

        if (bookmarkIndex === -1) {
          state.bookmarks.push(objectToUpdate);
        } else {
          state.bookmarks.splice(bookmarkIndex, 1);
        }
      });
  },
});

export const { handleSearchQuery } = layoutSlice.actions;

export default layoutSlice.reducer;
