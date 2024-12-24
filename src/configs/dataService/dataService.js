/* eslint-disable no-console */
import axios from 'axios';
import { getItem, setItem } from '../../utility/localStorageControl';
import getTeamId from '../../utility/commonUtils';
// eslint-disable-next-line import/no-cycle
import errorHandler from '../../utility/errorHandler';
import { apiAuthEndpoint } from '../api';

const client = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This enables sending cookies with requests
});

function constructUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl);

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url.toString();
}
class DataService {
  static get(path = '') {
    const team_id = getTeamId('team_id');
    const params = {
      team_id,
    };
    const fullUrl = constructUrlWithParams(path, params);

    return client({
      method: 'GET',
      url: team_id ? fullUrl : path,
      withCredentials: true,
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    const team_id = getTeamId('team_id');
    const params = {
      team_id,
    };
    const fullUrl = constructUrlWithParams(path, params);
    return client({
      method: 'POST',
      url: team_id ? fullUrl : path,
      data,
      headers: { ...optionalHeader },
      withCredentials: true,
    });
  }

  static patch(path = '', data = {}, optionalHeader = {}) {
    const team_id = getTeamId('team_id');
    const params = {
      team_id,
    };
    const fullUrl = constructUrlWithParams(path, params);
    return client({
      method: 'PATCH',
      url: team_id ? fullUrl : path,
      data,
      headers: { ...optionalHeader },
      withCredentials: true,
    });
  }

  static put(path = '', data = {}, optionalHeader = {}) {
    const team_id = getTeamId('team_id');
    const params = {
      team_id,
    };
    const fullUrl = constructUrlWithParams(path, params);
    return client({
      method: 'PUT',
      url: team_id ? fullUrl : path,
      data,
      headers: { ...optionalHeader },
      withCredentials: true,
    });
  }

  static putWithoutToken(path = '', data = {}, optionalHeader = {}) {
    return axios({
      method: 'PUT',
      url: path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static delete(path = '', data = {}) {
    const team_id = getTeamId('team_id');
    const params = {
      team_id,
    };
    const fullUrl = constructUrlWithParams(path, params);
    return client({
      method: 'DELETE',
      url: team_id ? fullUrl : path,
      data: JSON.stringify(data),
      withCredentials: true,
    });
  }
}

let refreshTokenRequest;

const resetRefreshTokenRequest = () => {
  refreshTokenRequest = null;
};
const makeActualAuthenticationRequest = () => {
  const response = axios.post(
    `${apiAuthEndpoint}/api/v1/auth/refresh`,

    { withCredentials: true },
  );
  return response;
};
const getRefreshToken = () => {
  if (!refreshTokenRequest) {
    refreshTokenRequest = makeActualAuthenticationRequest();
    refreshTokenRequest.then(resetRefreshTokenRequest).catch((err) => errorHandler(err));
  }
  return refreshTokenRequest;
};

client.interceptors.request.use(async (req) => {
  const accessToken = getItem('userLoggedIn');
  const accessTokenExpiry = getItem('access_token_expires');
  const refreshTokenExpiry = getItem('refresh_token_expires');

  if (accessToken) {
    if (refreshTokenExpiry > new Date().valueOf()) {
      if (accessTokenExpiry < new Date().valueOf()) {
        await getRefreshToken().then((res) => {
          setItem('access_token_expires', res.data.data.access_token_expiry);
          req.headers.Authorization = `Bearer ${res.data.data.access_token}`;
        });
      }
    } else {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return req;
});

export default DataService;
