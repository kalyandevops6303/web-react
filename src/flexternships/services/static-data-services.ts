import axios from 'axios';
import { routes } from '@flexternships/utils/api';

export const fetchAllRoles = async () => {
    const response = await axios.get(routes.userManagement.static.roles.fetchAll); // Replace with your endpoint
    return response.data;
}

export const fetchAllSkills = async () => {
    const response = await axios.get(routes.userManagement.static.skills.fetchAll); // Replace with your endpoint
    return response.data.data;
}

export const fetchAllTools = async () => {
    const response = await axios.get(routes.userManagement.static.tools.fetchAll); // Replace with your endpoint
    return response.data.data;
}