// File Types
import psdFileIcon from '@flexternships/assets/icons/file-types/psdFile.png';
import svgFileIcon from '@flexternships/assets/icons/file-types/svgFile.png';
import txtFileIcon from '@flexternships/assets/icons/file-types/txtFile.png';
import xlsFileIcon from '@flexternships/assets/icons/file-types/xlsFile.png';
import zipFileIcon from '@flexternships/assets/icons/file-types/zipFile.png';
import aiFileIcon from '@flexternships/assets/icons/file-types/aiFile.png';
import aviFileIcon from '@flexternships/assets/icons/file-types/aviFile.png';
import mkvFileIcon from '@flexternships/assets/icons/file-types/mkvFile.png';
import mp3FileIcon from '@flexternships/assets/icons/file-types/mp3File.png';
import pdfFileIcon from '@flexternships/assets/icons/file-types/pdfFile.png';
import pptFileIcon from '@flexternships/assets/icons/file-types/pptFile.png';
import docFileIcon from '@flexternships/assets/icons/file-types/docFile.png';
import gifFileIcon from '@flexternships/assets/icons/file-types/gifFile.png';
import jpgFileIcon from '@flexternships/assets/icons/file-types/jpgFile.png';
import pngFileIcon from '@flexternships/assets/icons/file-types/pngFile.png';
/**
 * Converts a file size in bytes to a human-readable string (KB, MB, GB, TB, etc.).
 * @param sizeInBytes - The file size in bytes.
 * @param decimalPlaces - Number of decimal places to display (default is 2).
 * @returns A string with the file size in the appropriate unit.
 */
export function formatFileSize(sizeInBytes: number, decimalPlaces: number = 2): string {
  if (sizeInBytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const k = 1024;
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
  const size = parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(decimalPlaces));

  return `${size} ${units[i]}`;
}

/**
 * Returns the appropriate SVG component based on the file extension.
 * @param fileName - The name of the file (e.g., "document.pdf").
 * @returns path to the icon for the file type.
 */
export const getFileIcon = (fileName: string) => {
  let splitName = fileName.split('.');
  const ext = splitName[splitName.length - 1].toLowerCase();

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
    case 'png':
      return pngFileIcon;
    case 'gif':
      return gifFileIcon;
    default:
      return docFileIcon;
  }
};
