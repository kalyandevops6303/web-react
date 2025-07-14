/**
 * Assessment service module for handling assessment-related operations.
 * @fileoverview Contains utility functions for fetching assessments, assessment results,
 * and grade metadata used across the application. Includes APIs for assessment data
 * retrieval and result processing.
 * @module assessment-service
 */

import axios from 'axios';
import { routes } from '../utils/api';
import { handleError } from '../utils/error-utils';
import { parseAssessmentResult, parseAssessments, parseGradeMetadata } from '../utils/parsing-utils';

/**
 * Fetches all available assessments for a project.
 * @param {string} [projectId] - Optional project ID to filter assessments by project.
 * @returns {Promise<Assessment[]>} A Promise that resolves to an array of assessments.
 * @throws {Error} If the assessments retrieval fails or an unexpected error occurs.
 */
export const getAllAssessments = async (projectId?: string, userId?: string) => {
  const config = {
    withCredentials: true,
    params: {
      project_id: projectId,
      user_id: userId,
    },
  };
  try {
    const response = await axios.get(routes.projectManagementV2.assessments.fetchAll, config);
    return parseAssessments(response?.data?.data || []);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching assessments');
  }
};

/**
 * Fetches the result of a specific assessment.
 * @param {string} projectId - The ID of the project associated with the assessment.
 * @param {string} assessmentId - The ID of the assessment to fetch results for.
 * @returns {Promise<AssessmentSectionResult[]>} A Promise that resolves to an array of assessment section results.
 * @throws {Error} If the assessment result retrieval fails or an unexpected error occurs.
 */
export const getAssessmentResult = async (projectId: string, assessmentId: string) => {
  const config = {
    withCredentials: true,
    params: {
      project_id: projectId,
      assessment_id: assessmentId,
    },
  };
  try {
    const response = await axios.get(routes.projectManagementV2.assessments.fetchResult, config);
    return parseAssessmentResult(response?.data?.data || []);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching assessment results');
  }
};

/**
 * Fetches grade metadata for assessments.
 * @returns {Promise<GradeMetadata[]>} A Promise that resolves to an array of grade metadata.
 * @throws {Error} If the grade metadata retrieval fails or an unexpected error occurs.
 */
export const getGradeMetadata = async () => {
  const config = {
    withCredentials: true,
  };
  try {
    const response = await axios.get(routes.projectManagementV2.assessments.fetchGradeMetadata, config);
    return parseGradeMetadata(response?.data?.data || []);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching grade metadata');
  }
};
