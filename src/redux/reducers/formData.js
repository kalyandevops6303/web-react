import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  formDocuments: null,
  formImage: null,
  parseResume: false,
  isFormImageRemoved: null,
  confirmSaveForLater: false,
  navigatingRoute: '',
  resumeDataUploadedForPersonal: false,
  resumeDataUploadedForEducation: false,
  resumeDataUploadedForSocial: false,
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
    setResumeDataUploadedForPersonal: (state, action) => ({
      ...state,
      resumeDataUploadedForPersonal: action.payload,
    }),
    setResumeDataUploadedForEducation: (state, action) => ({
      ...state,
      resumeDataUploadedForEducation: action.payload,
    }),
    setResumeDataUploadedForSocial: (state, action) => ({
      ...state,
      resumeDataUploadedForSocial: action.payload,
    }),
  },
});

export const { setFormData, setFormDocuments, setFormImage, setResumeParsed, setIsFormImageRemoved, clearAllFormData, setConfirmSaveForLater, setNavigatingRoute, setResumeDataUploadedForPersonal, setResumeDataUploadedForEducation, setResumeDataUploadedForSocial } =
  formData.actions;

export default formData.reducer;
