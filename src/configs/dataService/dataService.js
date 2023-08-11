import axios from 'axios';
import { getItem } from '../../utility/localStorageControl';

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

class DataService {
  static get(path = '', data = {}) {
    const teamId = getItem('teamId');
    return client({
      method: 'GET',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    const teamId = getItem('teamId');
    return client({
      method: 'POST',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = '', data = {}, optionalHeader = {}) {
    const teamId = getItem('teamId');
    return client({
      method: 'PATCH',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static put(path = '', data = {}, optionalHeader = {}) {
    const teamId = getItem('teamId');
    return client({
      method: 'PUT',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static putWithoutToken(path = '', data = {}, optionalHeader = {}) {
    const teamId = getItem('teamId');
    return axios({
      method: 'PUT',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static delete(path = '', data = {}) {
    const teamId = getItem('teamId');
    return client({
      method: 'DELETE',
      url: teamId ? `${path}?teamId=${teamId}` : path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

export default DataService;
