import axios from 'axios';
import { routes } from '@flexternships/utils/api';

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
export const fetchAllRoles = async () => {
    const response = await axios.get(routes.userManagement.static.roles.fetchAll);
    return response?.data || [];
}

export const fetchAllSkills = async () => {
    const response = await axios.get(routes.userManagement.static.skills.fetchAll);
    return response?.data?.data || [];
}

export const fetchAllTools = async () => {
    const response = await axios.get(routes.userManagement.static.tools.fetchAll);
    return response?.data?.data || [];
}


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