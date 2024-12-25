import { getItemFromSession } from './sessesionStorageControl';

const getTeamId = () => getItemFromSession('team_id');

export default getTeamId;

export const isUserLoggedIn = () => {
  const userId = localStorage.getItem('user_id');
  const accessTokenExpiry = localStorage.getItem('access_token_expires');
  const refreshTokenExpiry = localStorage.getItem('refresh_token_expires');

  if (!userId || !accessTokenExpiry || !refreshTokenExpiry) {
    return false;
  }

  const currentTimestamp = new Date();
  if (currentTimestamp < new Date(accessTokenExpiry)) {
    return false;
  }

  return true;
};
