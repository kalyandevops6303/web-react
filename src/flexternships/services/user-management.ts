/**
 * User management service module for handling user-related operations.
 * @fileoverview Contains functions for managing user profiles, authentication, roles and permissions.
 * Includes APIs for file uploads, password management, and user details retrieval.
 * @module user-management
 */

import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import axios from 'axios';
import { FlexternClientAccountDetails, FlexternClientProfileDetails } from '../constraints/types/user-profile-types';
import { isEmpty } from 'lodash';
import { handleError } from '../utils/error-utils';
import { ValidatedRequestToken } from '../constraints/types/core-types';
import { logout as logoutZustand } from '../utils/core-utils';
import errorHandler from '@/utility/errorHandler';

/// File Endpoints
/**
 * Retrieves a file upload URL for a given image filename.
 * @param filename - The name of the image file to be uploaded.
 * @returns A Promise that resolves to the image upload URL data.
 * @throws {Error} If the file upload URL retrieval fails or an unexpected error occurs.
 */
export const getImageUploadUrl = async (filename: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
    params: {
      filename: filename,
    },
  };
  try {
    const response = await axios.get(routes.userManagement.files.getImageUploadUrl, config);
    return response.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving the image upload URL');
  }
};

/// Password Endpoints
/**
 * Changes the user's password using their current password for authentication.
 * @param currentPassword - The user's current password.
 * @param newPassword - The new password to set.
 * @returns A Promise that resolves to the response data from the password change request.
 * @throws {Error} If the password change fails or an unexpected error occurs.
 */
export const changePasswordWithCurrentPassword = async (currentPassword: string, newPassword: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, withCredentials: true };

  try {
    const response = await axios.post(
      routes.userManagement.password.changePasswordWithCurrentPassword,
      { current_password: currentPassword, new_password: newPassword },
      config,
    );
    return response.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while changing the password');
  }
};

/// User Endpoints
/**
 * Validates a request token.
 * @param requestToken - The token to validate.
 * @returns A Promise that resolves to the validation response data.
 * @throws {Error} If the validation fails or an unexpected error occurs.
 */
export const validateRequestToken = async (requestToken: string): Promise<ValidatedRequestToken | undefined> => {
  try {
    const response = await axios.post(routes.userManagement.requests.v2.validateRequestToken, {
      request_token: requestToken,
    });

    return {
      invitationByUserId: response.data.data.invitation_by_user_id,
      emailInvited: response.data.data.email_invited,
      projectId: response.data.data.project_id,
      invitationType: response.data.data.invitation_type,
      userStatus: response.data.data.user_status,
    };
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while validating the request token');
  }
};

/**
 * Validates a user request.
 * @param requestToken - The token to validate the user request.
 * @returns A Promise that resolves to the validation response data.
 * @throws {Error} If the validation fails or an unexpected error occurs.
 */
export const validateUserRequestByToken = async (requestToken: string): Promise<boolean | undefined> => {
  try {
    const response = await axios.post(
      routes.userManagement.requests.v2.checkUser,
      { request_token: requestToken },
      { withCredentials: true },
    );
    return response.data.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while validating the user request');
  }
};

/**
 * Fetches user details including app roles.
 * @returns A Promise that resolves to the user details.
 * @throws {Error} If the user details retrieval fails or an unexpected error occurs.
 */
export const getUserDetails = async () => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  try {
    const response = await axios.get(routes.userManagement.user.getUserDetails, config);

    return response.data.data;
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
    logoutZustand();
    // To logout mother app from redux
    errorHandler(error as Error);
    handleError(error as Error, 'An unexpected error occurred while fetching user details');
  }
};

/**
 * Creates or updates Flextern client account information.
 * @param data - The client account details to be upserted.
 * @returns A Promise that resolves when the operation is complete.
 * @throws {Error} If the account information update fails or an unexpected error occurs.
 */
export const upsertFlexternClientAccountInfo = async (data: FlexternClientAccountDetails) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  const formattedData: Record<string, any> = {};
  if (!isEmpty(data.firstname)) {
    formattedData.first_name = data.firstname;
  }
  if (!isEmpty(data.lastname)) {
    formattedData.last_name = data.lastname;
  }
  if (!isEmpty(data.timezone)) {
    formattedData.timezone = data.timezone.name;
  }

  if (!isEmpty(data.title)) {
    formattedData.title = data.title;
  }
  if (!isEmpty(data.department)) {
    formattedData.department = data.department;
  }

  // Optional fields - these are allowed to be unset
  formattedData.image_uri = data.imageUri;
  formattedData.linkedin_url = data.linkedin;

  try {
    await axios.post(routes.userManagement.user.v2.postAccountDetails, formattedData, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while updating client account information');
  }
};

/**
 * Updates Flextern client profile information.
 * @param data - Partial client profile details to be updated.
 * @returns A Promise that resolves when the update is complete.
 * @throws {Error} If the profile information update fails or an unexpected error occurs.
 */
export const updateFlexternClientInfo = async (data: Partial<FlexternClientProfileDetails>) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  const formattedData: Record<string, any> = {};

  if (!isEmpty(data.firstname)) {
    formattedData.first_name = data.firstname;
  }
  if (!isEmpty(data.lastname)) {
    formattedData.last_name = data.lastname;
  }
  if (!isEmpty(data.imageUri)) {
    formattedData.image_uri = data.imageUri;
  }
  if (!isEmpty(data.department)) {
    formattedData.department = data.department;
  }
  if (!isEmpty(data.companyLogo)) {
    formattedData.company_logo = data.companyLogo;
  }
  if (!isEmpty(data.title)) {
    formattedData.title = data.title;
  }
  if (!isEmpty(data.companyTagline)) {
    formattedData.company_tagline = data.companyTagline;
  }
  if (!isEmpty(data.companyIndustry)) {
    formattedData.company_industry = data.companyIndustry._id;
  }
  if (!isEmpty(data.companyStrength)) {
    formattedData.company_strength = data.companyStrength;
  }
  if (!isEmpty(data.officeAddress)) {
    formattedData.office_address = {
      country: data.officeAddress.country?._id || undefined,
      state: data.officeAddress.state?._id || undefined,
      city: data.officeAddress.city?._id || undefined,
      street_address: data.officeAddress.streetAddress,
      building_number: data.officeAddress.buildingNumber,
      zip_code: data.officeAddress.zipCode,
    };
  }
  if (!isEmpty(data.socialLinks)) {
    formattedData.social_links = data.socialLinks;
  }
  try {
    await axios.put(routes.userManagement.user.v2.putProfileDetails, formattedData, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while updating client profile information');
  }
};

/**
 * Retrieves Flextern client organization information.
 * @returns A Promise that resolves to the organization details.
 * @throws {Error} If the organization details retrieval fails or an unexpected error occurs.
 */
export const getFlexternClientOrgInfo = async () => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  try {
    const response = await axios.get(routes.userManagement.user.v2.getOrganisationDetails, config);
    return response.data.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching organization details');
  }
};

// Static Data Endpoints
// Types used in the services
export type PaginatedData<T = any> = {
  metadata: {
    current_page: number;
    page_size: number;
    total_records: number;
    has_next_page: boolean;
  };
  data: (T & { _id: string; name: string })[];
};

// Services code starts here
/**
 * Fetches all available roles.
 * @returns A Promise that resolves to an array of roles.
 * @throws {Error} If the roles retrieval fails or an unexpected error occurs.
 */
export const fetchAllRoles = async () => {
  try {
    const response = await axios.get(routes.userManagement.static.roles.fetchAll, { withCredentials: true });
    return response?.data || [];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching roles');
  }
};

/**
 * Fetches all available skills.
 * @returns A Promise that resolves to an array of skills.
 * @throws {Error} If the skills retrieval fails or an unexpected error occurs.
 */
export const fetchAllSkills = async () => {
  try {
    const response = await axios.get(routes.userManagement.static.skills.fetchAll, { withCredentials: true });
    return response?.data?.data || [];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching skills');
  }
};

/**
 * Fetches all available tools.
 * @returns A Promise that resolves to an array of tools.
 * @throws {Error} If the tools retrieval fails or an unexpected error occurs.
 */
export const fetchAllTools = async () => {
  try {
    const response = await axios.get(routes.userManagement.static.tools.fetchAll, { withCredentials: true });
    return response?.data?.data || [];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching tools');
  }
};
/**
 * Fetches paginated roles data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter roles.
 * @returns A Promise that resolves to paginated roles data.
 * @throws {Error} If the roles retrieval fails or an unexpected error occurs.
 */
export const fetchRolesPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.roles.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated roles');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

export const fetchTimezonesPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.timezone.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated timezones');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated skills data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter skills.
 * @returns A Promise that resolves to paginated skills data.
 * @throws {Error} If the skills retrieval fails or an unexpected error occurs.
 */
export const fetchSkillsPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.skills.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated skills');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated tools data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter tools.
 * @returns A Promise that resolves to paginated tools data.
 * @throws {Error} If the tools retrieval fails or an unexpected error occurs.
 */
export const fetchToolsPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.tools.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated tools');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated company industries data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter company industries.
 * @returns A Promise that resolves to paginated company industries data.
 * @throws {Error} If the company industries retrieval fails or an unexpected error occurs.
 */
export const fetchCompanyIndustriesPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.companyIndustry.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated company industries');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated countries data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter countries.
 * @returns A Promise that resolves to paginated countries data.
 * @throws {Error} If the countries retrieval fails or an unexpected error occurs.
 */
export const fetchCountriesPaginated = async (
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.country.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated countries');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated states data for a specific country.
 * @param country_id - The ID of the country to fetch states for.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter states.
 * @returns A Promise that resolves to paginated states data.
 * @throws {Error} If the states retrieval fails or an unexpected error occurs.
 */
export const fetchStatesPaginatedByCountry = async (
  country_id: string,
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.state.fetchPaginatedByCountry}/${country_id}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated states');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};

/**
 * Fetches paginated cities data for a specific state.
 * @param state_id - The ID of the state to fetch cities for.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter cities.
 * @returns A Promise that resolves to paginated cities data.
 * @throws {Error} If the cities retrieval fails or an unexpected error occurs.
 */
export const fetchCitiesPaginatedByState = async (
  state_id: string,
  page: number = 1,
  page_size: number = 10,
  search_query?: string,
): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
  try {
    const response = await axios.get(
      `${routes.userManagement.static.city.fetchPaginatedByState}/${state_id}?page=${page}&page_size=${page_size}&search_query=${search_query}`,
      { withCredentials: true },
    );
    return response?.data?.data || emptyData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching paginated cities');
  }
  return emptyData; // Add this line to ensure a return value in all cases
};
