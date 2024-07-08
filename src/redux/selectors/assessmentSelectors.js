import { createSelector } from '@reduxjs/toolkit';

const assessmentSelector = (state) => state.assessments; 

const selectUserAssessments = createSelector(assessmentSelector, (assessments) => assessments.userAssessments);
const selectUserAssessmentsCount = createSelector(assessmentSelector, (assessments) => assessments.userAssessmentsCount);
const selectNotUserAssessments = createSelector(assessmentSelector, (assessments) => assessments.notUserAssessments);
const selectAllAssessments = createSelector(assessmentSelector, (assessments) => assessments.allAssessments);
const selectAssessmentLink = createSelector(assessmentSelector, (assessments) => assessments.assessmentLink);
const selectAssessmentLinkLoading = createSelector(assessmentSelector, (assessments) => assessments.assessmentLinkLoading);
const selectDeleteAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.deleteAssessmentLoading);
const selectAddAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.addAssessmentLoading);
const selectUserAssessmentsLoading = createSelector(assessmentSelector, (assessments) => assessments.userAssessmentsLoading);
const selectDeleteNonAssessmentLoading = createSelector(assessmentSelector, (assessments) => assessments.deleteNonAssessmentLoading);

export {
    selectUserAssessments,
    selectUserAssessmentsCount,
    selectNotUserAssessments,
    selectAllAssessments,
    selectAssessmentLink,
    selectAssessmentLinkLoading,
    selectDeleteAssessmentLoading, 
    selectAddAssessmentLoading,
    selectUserAssessmentsLoading,
    selectDeleteNonAssessmentLoading
}