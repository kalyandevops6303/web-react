import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  formDocuments: null,
  formImage: null,
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
    setFormImage: (state, action) => ({
      ...state,
      formImage: action.payload,
    }),
    clearAllFormData: (state) => ({
      ...state,
      formData: null,
      formDocuments: null,
      formImage: null,
    }),
  },
});

export const { setFormData, setFormDocuments, setFormImage, clearAllFormData } = formData.actions;

export default formData.reducer;
