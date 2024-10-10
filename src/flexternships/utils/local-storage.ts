export const appendAuthToken = (dict: any) => {
    const token = localStorage.getItem('access_token');
    if (token === null) {
        throw new Error("Access token not found");
    }

    // Append the token to the dictionary
    return { ...dict, Authorization: `Bearer ${token}` };
};
