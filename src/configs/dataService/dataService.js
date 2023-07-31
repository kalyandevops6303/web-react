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
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static put(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'PUT',
      url: path,
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
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

export default DataService;
