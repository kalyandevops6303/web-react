import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAssessments: [],
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
        deleteAssessmentsSuccess: (state, action) => ({
            ...state, 
            deleteAssessment: action.payload,
            deleteAssessmentLoading: false 
        }),
        deleteAssessmentsFailure: (state, action) => ({
            ...state, 
            deleteAssessmentLoading: false,
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
    editAssessmentFailure
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
