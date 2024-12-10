import Cookies from 'js-cookie';

export const getCookiesItem = (key) => {
  return Cookies.get(key); // Fetches the cookie value by key
};
export const setCookiesItem = (key, value, expires) => {
  Cookies.set(key, value, {
    secure: true,
    expires, // Expiration in days
  });
};

export const removeCookiesItem = (key) => {
  Cookies.remove(key);
};
