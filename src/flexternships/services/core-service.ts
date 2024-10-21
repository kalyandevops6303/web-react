import axios from "axios";

/**
 * Uploads a file to a specified URL.
 * @param url - The URL to upload the file to.
 * @param file - The file to be uploaded.
 * @returns A Promise that resolves to the upload response.
 */
export const uploadFileToUrl = async (url: string, file: any) => {
    const uploadResponse = await axios.put(url, file, {
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': file.type,
        }
    });
    return uploadResponse;
}
