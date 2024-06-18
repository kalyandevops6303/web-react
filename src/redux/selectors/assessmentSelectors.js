import { createSelector } from '@reduxjs/toolkit';

const assessmentSelector = (state) => state.assessments; 

const selectUserAssessments = createSelector(assessmentSelector, (assessments) => assessments.userAssessments);
const selectUserAssessmentsCount = createSelector(assessmentSelector, (assessments) => assessments.userAssessmentsCount);
const selectAllAssessments = createSelector(assessmentSelector, (assessments) => assessments.allAssessments);
const selectAssessmentLink = createSelector(assessmentSelector, (assessments) => assessments.assessmentLink);
const selectAssessmentLinkLoading = createSelector(assessmentSelector, (assessments) => assessments.assessmentLinkLoading);
const selectEditAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.editAssessmentLoading);
const selectDeleteAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.deleteAssessmentLoading);
const selectAddAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.addAssessmentLoading);
const selectUserAssessmentsLoading = createSelector(assessmentSelector, (assessments) => assessments.userAssessmentsLoading);

export {
    selectUserAssessments,
    selectUserAssessmentsCount,
    selectAllAssessments,
    selectAssessmentLink,
    selectAssessmentLinkLoading,
    selectEditAssessmentLoading, 
    selectDeleteAssessmentLoading, 
    selectAddAssessmentLoading,
    selectUserAssessmentsLoading
}