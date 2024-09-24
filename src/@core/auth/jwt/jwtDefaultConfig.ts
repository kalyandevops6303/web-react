export default {
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
};
