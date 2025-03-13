/**
 * Adds query parameters to a URL
 * @param url - Base URL to add parameters to
 * @param params - Record of parameter key-value pairs to add
 * @returns URL with added query parameters
 */
export const addQueryParams = (url: string | undefined, params: Record<string, string> = {}): string => {
  if (!url) return '';

  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });

  return urlObj.toString();
};

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

/**
 * Generates a consistent color from a string by hashing
 * @param str - Input string to generate color from
 * @param params - Optional parameters
 * @param params.opacity - Optional opacity value from 0-100
 * @returns Hex or RGBA color code
 */
export const stringToColour = (str: string, params?: { opacity?: number }): string => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }

  if (params?.opacity !== undefined) {
    const opacity = Math.max(0, Math.min(100, params.opacity)) / 100;
    const rgb = colour.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (rgb) {
      return `rgba(${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)}, ${opacity})`;
    }
  }

  return colour;
};
