import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAssessments: [],
    notUserAssessments: [],
    deleteNonAssessmentLoading: false,
    userAssessmentsCount: 0, 
    userAssessmentsLoading: false,
    allAssessments: [],
    allAssessmentsLoading: false,
    deleteAssessment: [],
    deleteAssessmentLoading: false, 
    toggleAssessmentHiddenLoading: true,
    addAssessmentLoading: false,
    assessmentLink: null,
    assessmentLinkLoading: false,
    editAssessmentLoading: false,
    prepopulateLoading: false,
    error: null
}

const assessmentSlice = createSlice({
    name: 'assessments',
    initialState,
    reducers: {
        userAssessmentsRequest: (state) => ({
            ...state,
            userAssessmentsLoading: true,
            error: null,
        }),
        userAssessmentsSuccess: (state, action) => ({
            ...state,
            userAssessments: action.payload.assessments,
            userAssessmentsCount: action.payload.exam_counter,
            notUserAssessments: action.payload.not_assessments,
            userAssessmentsLoading: false,
            error: null
        }),
        userAssessmentsFailure: (state, action) => ({
            ...state,
            userAssessmentsLoading: false,
            error: action.payload,
        }),
        allAssessmentsRequest: (state) => ({
            ...state,
            allAssessmentsLoading: true,
            error: null,
        }),
        allAssessmentsSuccess: (state, action) => ({
            ...state,
            allAssessments: action.payload,
            allAssessmentsLoading: false,
        }),
        allAssessmentsFailure: (state, action) => ({
            ...state,
            allAssessmentsLoading: false,
            error: action.payload,
        }),
        deleteAssessmentsRequest: (state) => ({
            ...state, 
            deleteAssessmentLoading: true, 
            error: null
        }),
        deleteAssessmentsSuccess: (state) => ({
            ...state, 
            deleteAssessmentLoading: false 
        }),
        deleteAssessmentsFailure: (state, action) => ({
            ...state, 
            deleteAssessmentLoading: false,
            error: action.payload
        }),
        deleteNonAssessmentsRequest: (state) => ({
            ...state, 
            deleteNonAssessmentLoading: true, 
            error: null
        }),
        deleteNonAssessmentsSuccess: (state) => ({
            ...state, 
            deleteNonAssessmentLoading: false 
        }),
        deleteNonAssessmentsFailure: (state, action) => ({
            ...state, 
            deleteNonAssessmentLoading: false,
            error: action.payload
        }),
        toggleAssessmentHiddenRequest: (state) => ({
            ...state, 
            toggleAssessmentHiddenLoading: true,  
            error: null
        }),
        toggleAssessmentHiddenSuccess: (state) => ({
            ...state, 
            toggleAssessmentHiddenLoading: false,
            error: null
        }),
        toggleAssessmentHiddenFailure: (state, action) => ({
            ...state, 
            toggleAssessmentHiddenLoading: false,
            error: action.payload
        }),
        addAssessmentRequest: (state) => ({
            ...state, 
            addAssessmentLoading: true,
            error: null 
        }),
        addAssessmentSuccess: (state) => ({
            ...state, 
            addAssessmentLoading: false, 
            error: null 
        }),
        addAssessmentFailure: (state, action) => ({
            ...state, 
            addAssessmentLoading: false, 
            error: action.payload
        }),
        assessmentLinkRequest: (state) => ({
            ...state, 
            assessmentLinkLoading: true, 
            error: null 
        }),
        assessmentLinkSuccess: (state, action) => ({
            ...state, 
            assessmentLink: action.payload, 
            assessmentLinkLoading: false,
            error: null 
        }),
        assessmentLinkFailure: (state, action) => ({
            ...state, 
            assessmentLink: null, 
            assessmentLinkLoading: false, 
            error: action.payload
        }),
        editAssessmentRequest: (state) => ({
            ...state, 
            editAssessmentLoading: true,
            error: null 
        }),
        editAssessmentSuccess: (state) => ({
            ...state, 
            editAssessmentLoading: false 
        }),
        editAssessmentFailure: (state, action) => ({
            ...state, 
            editAssessmentLoading: false, 
            error: action.payload 
        }),
        prepopulateRequest: (state) => ({
            ...state, 
            prepopulateLoading: true, 
            error: null 
        }),
        prepopulateSuccess: (state) => ({
            ...state, 
            prepopulateLoading: false, 
            error: null 
        }),
        prepopulateFailure: (state, action) => ({
            ...state, 
            prepopulateLoading: false, 
            error: action.payload 
        })
    }
})

export const {
    userAssessmentsRequest,
    userAssessmentsSuccess,
    userAssessmentsFailure,
    allAssessmentsRequest, 
    allAssessmentsSuccess, 
    allAssessmentsFailure,
    deleteAssessmentsRequest, 
    deleteAssessmentsSuccess, 
    deleteAssessmentsFailure,
    deleteNonAssessmentsRequest, 
    deleteNonAssessmentsSuccess, 
    deleteNonAssessmentsFailure,
    toggleAssessmentHiddenRequest, 
    toggleAssessmentHiddenSuccess, 
    toggleAssessmentHiddenFailure,
    addAssessmentRequest, 
    addAssessmentSuccess, 
    addAssessmentFailure,
    assessmentLinkRequest, 
    assessmentLinkSuccess, 
    assessmentLinkFailure,
    editAssessmentRequest, 
    editAssessmentSuccess, 
    editAssessmentFailure,
    prepopulateRequest, 
    prepopulateFailure, 
    prepopulateSuccess
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
