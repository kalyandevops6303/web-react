/**
 * Appends the authentication token to the provided dictionary.
 * @param dict - The original dictionary to which the token will be appended.
 * @returns A new dictionary with the authentication token appended.
 * @throws {Error} If the access token is not found in local storage.
 */
import { isUserLoggedIn } from '@/utility/commonUtils';
export const appendAuthToken = (dict: any) => {
  const token = isUserLoggedIn();
  if (token === null) {
    throw new Error('Access token not found');
  }

  // Append the token to the dictionary
  return { ...dict, Authorization: `Bearer ${token}` };
};
