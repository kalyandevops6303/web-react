// File Types
import psdFileIcon from './shared_resources/file-types/psdFile.png';
import svgFileIcon from './shared_resources/file-types/svgFile.png';
import txtFileIcon from './shared_resources/file-types/txtFile.png';
import xlsFileIcon from './shared_resources/file-types/xlsFile.png';
import zipFileIcon from './shared_resources/file-types/zipFile.png';
import aiFileIcon from './shared_resources/file-types/aiFile.png';
import aviFileIcon from './shared_resources/file-types/aviFile.png';
import mkvFileIcon from './shared_resources/file-types/mkvFile.png';
import mp3FileIcon from './shared_resources/file-types/mp3File.png';
import pdfFileIcon from './shared_resources/file-types/pdfFile.png';
import pptFileIcon from './shared_resources/file-types/pptFile.png';
import docFileIcon from './shared_resources/file-types/docFile.png';
import gifFileIcon from './shared_resources/file-types/gifFile.png';
import jpgFileIcon from './shared_resources/file-types/jpgFile.png';

export const getUserColor = (user) => {
  const colorBasisString = user.uid; // + user.name;
  // let hash = 0;
  // colorBasisString.split('').forEach((char) => {
  //   hash = char.charCodeAt(0) + ((hash << 5) - hash);
  // });
  // let color = '#';
  // for (let i = 0; i < 3; i++) {
  //   const value = (hash >> (i * 8)) & 0xff;
  //   color += value.toString(16).padStart(2, '0');
  // }
  // return color;
  return stringToColour(colorBasisString);
};

export const getFileIcon = (fileName) => {
  let ext = fileName.split('.');
  ext = ext[ext.length - 1];

  ext = ext.toLowerCase();

  switch (ext) {
    case 'psd':
      return psdFileIcon;
    case 'svg':
      return svgFileIcon;
    case 'txt':
      return txtFileIcon;
    case 'xls':
      return xlsFileIcon;
    case 'zip':
      return zipFileIcon;
    case 'ai':
      return aiFileIcon;
    case 'avi':
      return aviFileIcon;
    case 'mkv':
      return mkvFileIcon;
    case 'mp3':
      return mp3FileIcon;
    case 'pdf':
      return pdfFileIcon;
    case 'ppt':
      return pptFileIcon;
    case 'jpg':
      return jpgFileIcon;
    case 'gif':
      return gifFileIcon;
    default:
      return docFileIcon;
  }
};

export const convertFileSize = (fileSizeBytes) => {
  if(!fileSizeBytes) {
    return '';
  }
  // Define suffixes for different file sizes
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];

  // Determine the appropriate suffix
  let suffixIndex = 0;
  while (fileSizeBytes >= 1024 && suffixIndex < suffixes.length - 1) {
    suffixIndex++;
    fileSizeBytes /= 1024.0;
  }

  // Format the file size with the appropriate suffix
  let res = '';
  try {
    res = (fileSizeBytes?.toFixed(2) || '0') + ' ' + suffixes[suffixIndex];
  } catch (error) {
    res = '0 B';
  }
  return res;
};

export const generateAvatar = (generator, data) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 200;

  // Draw background
  context.fillStyle = stringToColour(generator);
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px 'Inter', sans-serif";
  context.fillStyle = 'white'; //foregroundColor;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(data, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
};

const stringToColour = function (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

export const downloadFile = async ({ data, file_name }) => {
  // Replace 'your_file_url' with the actual URL of the file you want to download
  const fileUrl = data?.download_url;
  try {
    // Fetch the file using the URL
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    // Create a blob URL for the file
    const blobUrl = URL.createObjectURL(blob);
    // Create a hidden anchor element
    // eslint-disable-next-line no-undef
    const a = document.createElement('a');
    a.style.display = 'none';
    // Set the href attribute to the blob URL
    a.href = blobUrl;
    // Set the download attribute with the extracted file name
    a.download = file_name || data?.file_name;
    // Append the anchor element to the document
    // eslint-disable-next-line no-undef
    document.body.appendChild(a);
    // Trigger a click on the anchor element to start the download
    a.click();
    // Remove the anchor element and revoke the blob URL from the document
    // eslint-disable-next-line no-undef
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};

export const handleLinkOpen = (URL) => {
  if (URL && (URL.startsWith('http://') || URL.startsWith('https://'))) {
    // eslint-disable-next-line no-undef
    window.open(URL, '_blank');
  } else {
    // eslint-disable-next-line no-undef
    window.open(`https://${URL}`, '_blank');
  }
};