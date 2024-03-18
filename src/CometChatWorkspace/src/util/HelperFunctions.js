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
  // Define suffixes for different file sizes
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];

  // Determine the appropriate suffix
  let suffixIndex = 0;
  while (fileSizeBytes >= 1024 && suffixIndex < suffixes.length - 1) {
    suffixIndex++;
    fileSizeBytes /= 1024.0;
  }

  // Format the file size with the appropriate suffix
  return (fileSizeBytes?.toFixed(2) || '0') + ' ' + suffixes[suffixIndex];
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
