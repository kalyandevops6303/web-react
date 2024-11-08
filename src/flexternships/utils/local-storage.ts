/**
 * Appends the authentication token to the provided dictionary.
 * @param dict - The original dictionary to which the token will be appended.
 * @returns A new dictionary with the authentication token appended.
 * @throws {Error} If the access token is not found in local storage.
 */
export const appendAuthToken = (dict: any) => {
  const token = localStorage.getItem('access_token');
  if (token === null) {
    throw new Error('Access token not found');
  }

  // Append the token to the dictionary
  return { ...dict, Authorization: `Bearer ${token}` };
};
