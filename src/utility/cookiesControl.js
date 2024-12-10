import Cookies from 'js-cookie';

export const getCookiesItem = (key) => Cookies.get(key);
export const setCookiesItem = (key, value, expires) => {
  Cookies.set(key, value, {
    secure: true,
    expires, 
  });
};

export const removeCookiesItem = (key) => {
  Cookies.remove(key);
};
