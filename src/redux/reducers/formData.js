import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  formDocuments: null,
  formImage: null,
  isFormImageRemoved: null,
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
    setIsFormImageRemoved: (state, action) => ({
      ...state,
      isFormImageRemoved: action.payload,
    }),
    clearAllFormData: (state) => ({
      ...state,
      formData: null,
      formDocuments: null,
      formImage: null,
      isFormImageRemoved: null,
    }),
  },
});

export const { setFormData, setFormDocuments, setFormImage, setIsFormImageRemoved, clearAllFormData } =
  formData.actions;

export default formData.reducer;
