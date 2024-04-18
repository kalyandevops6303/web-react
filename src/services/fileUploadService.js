/* eslint-disable import/no-cycle */
import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const fileScanningService = ({ fileKeys, isPrivate }) =>
  DataService.post(`${API.fileUpload.scan}?is_private=${isPrivate}`, fileKeys);

export default fileScanningService;
