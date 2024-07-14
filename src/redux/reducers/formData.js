import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  formDocuments: null,
  formImage: null,
  parseResume: false,
  isFormImageRemoved: null,
  confirmSaveForLater: false,
  navigatingRoute: '',
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
    setResumeParsed: (state,action) => ({
      ...state,
      parseResume: action.payload,
    }),
    setIsFormImageRemoved: (state, action) => ({
      ...state,
      isFormImageRemoved: action.payload,
    }),
    clearAllFormData: (state) => ({
      ...state,
      formData: null,
      // formDocuments: null,
      formImage: null,
      isFormImageRemoved: null,
    }),
    setConfirmSaveForLater: (state, action) => ({
      ...state,
      confirmSaveForLater: action.payload,
    }),
    setNavigatingRoute: (state, action) => ({
      ...state,
      navigatingRoute: action.payload,
    }),
  },
});

export const { setFormData, setFormDocuments, setFormImage, setResumeParsed, setIsFormImageRemoved, clearAllFormData, setConfirmSaveForLater, setNavigatingRoute } =
  formData.actions;

export default formData.reducer;
