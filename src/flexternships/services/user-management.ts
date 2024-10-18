// service to fetch user details along with app roles

import { routes } from "@flexternships/utils/api";
import { appendAuthToken } from "@flexternships/utils/local-storage";
import axios from "axios";

// service to post client personal info - creates client info

// service to put client info - accordingly updates the checkpoint too

// user details to be refreshed after last save and continue


// add other services as needed

export const getUserDetails = async () => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
    }
    const response = await axios.get(routes.userManagement.user.getUserDetails, config);
    return response.data.data;
}