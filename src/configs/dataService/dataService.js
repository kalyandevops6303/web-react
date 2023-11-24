import axios from 'axios';
import { getItem } from '../../utility/localStorageControl';
import { getTeamId } from '../../utility/Utils';

const authHeader = () => ({
  Authorization: `Bearer ${getItem('access_token')}`,
});

const client = axios.create({
  baseURL: '',
  headers: {
    Authorization: `Bearer ${getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
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
      headers: { ...authHeader() },
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
      headers: { ...authHeader(), ...optionalHeader },
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
      headers: { ...authHeader(), ...optionalHeader },
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
      headers: { ...authHeader(), ...optionalHeader },
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
      headers: { ...authHeader() },
    });
  }
}

export default DataService;
