import axios from 'axios';

/**
 * Uploads a file to a specified URL.
 * @param url - The URL to upload the file to.
 * @param file - The file to be uploaded.
 * @param setUploadProgress - A function to set the upload progress.
 * @param index - The index of the file being uploaded.
 * @returns A Promise that resolves to the upload response.
 */
export const uploadFileToUrl = async (url: string, file: any, setUploadProgress?: Function, index?: number) => {
  const uploadResponse = await axios.put(url, file, {
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': 'multipart/form-data',
      'Content-File-Type': file.type,
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      setUploadProgress && setUploadProgress(progress, index);
    },
    withCredentials: true,
  });
  return uploadResponse;
};
