/**
 * Legal services module for handling legal document operations.
 * @fileoverview Contains functions for managing legal documents, including retrieval and signing.
 * Includes APIs for fetching document details, signing documents, and other legal-related operations.
 * @module legal-services
 */

import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';

/**
 * Retrieves legal document details for a project.
 * @param projectId - The ID of the project to get legal document details for.
 * @param docType - The type of legal document to retrieve.
 * @returns A Promise that resolves to the legal document details or undefined.
 * @throws {Error} If the document details retrieval fails or an unexpected error occurs.
 */
export const getLegalDocDetails: (projectId: string, docType: string) => Promise<any> = async (projectId, docType) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      doc_type: docType,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.projectManagementV2.legal.details}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching legal document details');
  }
};

/**
 * Signs a legal document for a project.
 * @param projectId - The ID of the project to sign document for.
 * @param docType - The type of legal document to sign.
 * @returns A Promise that resolves to the signed document data or undefined.
 * @throws {Error} If the document signing fails or an unexpected error occurs.
 */
export const signLegalDocument: (projectId: string, docType: string) => Promise<any> = async (projectId, docType) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      doc_type: docType,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.put(`${routes.projectManagementV2.legal.signDocument}`, {}, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while signing document');
  }
};

/**
 * Checks the signed status of a legal document for a project.
 * @param projectId - The ID of the project to check document status for.
 * @param docType - The type of legal document to check.
 * @returns A Promise that resolves to the document signed status data or undefined.
 * @throws {Error} If the status check fails or an unexpected error occurs.
 */
export const getLegalDocSignedStatus: (projectId: string, docType: string) => Promise<any> = async (
  projectId,
  docType,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      doc_type: docType,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.projectManagementV2.legal.checkDocumentSigned}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching legal document details');
  }
};
