/**
 * Converts the input text to title case.
 * @param text - The input text to be converted.
 * @returns The text in title case.
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Masks the email address by replacing the middle characters with asterisks.
 * @param email - The email address to be masked.
 * @returns The masked email address.
 */
export const getMaskedEmail = (email: string): string => {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return email;
  const maskedLocalPart = localPart.slice(0, 2) + '****' + localPart.slice(-1);
  return `${maskedLocalPart}@${domain}`;
};
