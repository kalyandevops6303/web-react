/**
 * Converts the input text to title case.
 * @param text - The input text to be converted.
 * @returns The text in title case.
 */
export const toTitleCase = (text: string): string => {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
