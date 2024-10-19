// service to fetch user details along with app roles

import { routes } from "@flexternships/utils/api";
import { appendAuthToken } from "@flexternships/utils/local-storage";
import axios from "axios";
import { FlexternClientAccountDetails, FlexternClientProfileDetails } from "../constraints/types/user-profile-types";
import { isEmpty } from "lodash";

/// File Endpoints
/**
 * Retrieves a file upload URL for a given image filename.
 * @param filename - The name of the image file to be uploaded.
 * @returns A Promise that resolves to the image upload URL data.
 */
export const getImageUploadUrl = async (filename: string) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
        params: {
            filename: filename,
        }
    }
    const response = await axios.get(routes.userManagement.files.getImageUploadUrl, config);
    return response.data;
}

/// User Endpoints
/**
 * Fetches user details including app roles.
 * @returns A Promise that resolves to the user details.
 */
export const getUserDetails = async () => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
    }
    const response = await axios.get(routes.userManagement.user.getUserDetails, config);
    return response.data.data;
}

/**
 * Creates or updates Flextern client account information.
 * @param data - The client account details to be upserted.
 * @returns A Promise that resolves when the operation is complete.
 */
export const upsertFlexternClientAccountInfo = async (data: FlexternClientAccountDetails) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
    }
    const formattedData = {
        "first_name": data.firstname,
        "last_name": data.lastname,
        ...(data.imageUri ? { image_uri: data.imageUri } : {}),
    }
    await axios.post(routes.userManagement.user.v2.postAccountDetails, formattedData, config);
}

/**
 * Updates Flextern client profile information.
 * @param data - Partial client profile details to be updated.
 * @returns A Promise that resolves when the update is complete.
 */
export const updateFlexternClientInfo = async (data: Partial<FlexternClientProfileDetails>) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
    }
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
    if (!isEmpty(data.companyName)) {
        formattedData.company_name = data.companyName;
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
            zip_code: data.officeAddress.zipCode
        };
    }
    if (!isEmpty(data.socialLinks)) {
        formattedData.social_links = data.socialLinks;
    }
    await axios.put(routes.userManagement.user.v2.putProfileDetails, formattedData, config);
}

/**
 * Retrieves Flextern client organization information.
 * @returns A Promise that resolves to the organization details.
 */
export const getFlexternClientOrgInfo = async () => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
    }
    const response = await axios.get(routes.userManagement.user.v2.getOrganisationDetails, config);
    return response.data.data;
}



// Static Data Endpoints

// Types used in the services
export type PaginatedData = {
    metadata: {
        current_page: number
        page_size: number
        total_records: number
        has_next_page: boolean
    }
    data: { _id: string, name: string }[]
};

// Services code starts here
/**
 * Fetches all available roles.
 * @returns A Promise that resolves to an array of roles.
 */
export const fetchAllRoles = async () => {
    const response = await axios.get(routes.userManagement.static.roles.fetchAll);
    return response?.data || [];
}

/**
 * Fetches all available skills.
 * @returns A Promise that resolves to an array of skills.
 */
export const fetchAllSkills = async () => {
    const response = await axios.get(routes.userManagement.static.skills.fetchAll);
    return response?.data?.data || [];
}

/**
 * Fetches all available tools.
 * @returns A Promise that resolves to an array of tools.
 */
export const fetchAllTools = async () => {
    const response = await axios.get(routes.userManagement.static.tools.fetchAll);
    return response?.data?.data || [];
}

/**
 * Fetches paginated roles data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter roles.
 * @returns A Promise that resolves to paginated roles data.
 */
export const fetchRolesPaginated = async (page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.roles.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}

/**
 * Fetches paginated skills data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter skills.
 * @returns A Promise that resolves to paginated skills data.
 */
export const fetchSkillsPaginated = async (page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.skills.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}

/**
 * Fetches paginated tools data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter tools.
 * @returns A Promise that resolves to paginated tools data.
 */
export const fetchToolsPaginated = async (page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.tools.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}

/**
 * Fetches paginated company industries data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter company industries.
 * @returns A Promise that resolves to paginated company industries data.
 */
export const fetchCompanyIndustriesPaginated = async (page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.companyIndustry.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}


/**
 * Fetches paginated countries data.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter countries.
 * @returns A Promise that resolves to paginated countries data.
 */
export const fetchCountriesPaginated = async (page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.country.fetchPaginated}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}


/**
 * Fetches paginated states data for a specific country.
 * @param country_id - The ID of the country to fetch states for.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter states.
 * @returns A Promise that resolves to paginated states data.
 */
export const fetchStatesPaginatedByCountry = async (country_id: string, page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.state.fetchPaginatedByCountry}/${country_id}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}


/**
 * Fetches paginated cities data for a specific state.
 * @param state_id - The ID of the state to fetch cities for.
 * @param page - The page number to fetch (default: 1).
 * @param page_size - The number of items per page (default: 10).
 * @param search_query - Optional search query to filter cities.
 * @returns A Promise that resolves to paginated cities data.
 */
export const fetchCitiesPaginatedByState = async (state_id: string, page: number = 1, page_size: number = 10, search_query?: string): Promise<PaginatedData> => {
    const emptyData = {
        "metadata": {
            "current_page": 1,
            "page_size": 0,
            "total_records": 0,
            "has_next_page": false,
        },
        "data": [],
    }
    const response = await axios.get(`${routes.userManagement.static.city.fetchPaginatedByState}/${state_id}?page=${page}&page_size=${page_size}&search_query=${search_query}`);
    return response?.data?.data || emptyData;
}