/**
 * Converts domain or www text into clickable URLs by adding appropriate protocol
 * @param text - Text containing domain or www links
 * @returns Text with properly formatted URLs
 */
export const convertToClickableUrl = (text: string): string => {
  if (!text) return '';

  // Regex to match domains/www without protocol
  const urlRegex =
    /(?:^|\s)((?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/g;

  return text.replace(urlRegex, (url) => {
    let href = url.trim();
    // Add https:// if not present
    if (!href.match(/^https?:\/\//i)) {
      href = 'https://' + href;
    }
    return href;
  });
};
