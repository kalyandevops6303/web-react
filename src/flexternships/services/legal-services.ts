import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';

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
