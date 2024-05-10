import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  formDocuments: null,
};

const formData = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action) => ({
      ...state,
      formData: action.payload,
    }),
    setFormDocuments: (state, action) => ({
      ...state,
      formDocuments: action.payload,
    }),
    clearFormData: (state) => ({
      ...state,
      formData: null,
    }),
    clearFormDocuments: (state) => ({
      ...state,
      formDocuments: null,
    }),
  },
});

export const { setFormData, setFormDocuments, clearFormData, clearFormDocuments } = formData.actions;

export default formData.reducer;
