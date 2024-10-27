import axios from 'axios';
import { set } from 'lodash';

/**
 * Uploads a file to a specified URL.
 * @param url - The URL to upload the file to.
 * @param file - The file to be uploaded.
 * @returns A Promise that resolves to the upload response.
 */
export const uploadFileToUrl = async (url: string, file: any, setUploadProgress?: Function) => {
  const uploadResponse = await axios.put(url, file, {
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type,
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      setUploadProgress && setUploadProgress(progress);
    },
  });
  return uploadResponse;
};
