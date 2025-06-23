/**
 * Core service module for handling file operations and core functionality.
 * @fileoverview Contains utility functions for file uploads and other core operations
 * used across the application. Includes APIs for file upload progress tracking and
 * handling file metadata.
 * @module core-service
 */

import axios from 'axios';
import { routes } from '../utils/api';
import { handleError } from '../utils/error-utils';
import { parseAssessmentResult, parseAssessments, parseGradeMetadata } from '../utils/parsing-utils';

/**
 * Fetches all available assessments.
 * @returns A Promise that resolves to an array of assessments.
 * @throws {Error} If the assessments retrieval fails or an unexpected error occurs.
 */
export const getAllAssessments = async (projectId?: string) => {
  const config = {
    withCredentials: true,
    params: {
      project_id: projectId,
    },
  };
  try {
    const response = await axios.get(routes.projectManagementV2.assessments.fetchAll, config);
    return parseAssessments(response?.data?.data || []);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching assessments');
  }
};

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
    handleError(error as Error, 'An unexpected error occurred while fetching assessments');
  }
};

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
