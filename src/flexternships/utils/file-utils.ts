/**
 * Converts a file size in bytes to a human-readable string (KB, MB, GB, TB, etc.).
 * @param sizeInBytes - The file size in bytes.
 * @param decimalPlaces - Number of decimal places to display (default is 2).
 * @returns A string with the file size in the appropriate unit.
 */
export function formatFileSize(sizeInBytes: number, decimalPlaces: number = 2): string {
    if (sizeInBytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const k = 1024;
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    const size = parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(decimalPlaces));

    return `${size} ${units[i]}`;
}