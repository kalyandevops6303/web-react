/* eslint-disable no-undef */
const getItemFromSession = (key) => {
  const data = typeof window !== 'undefined' ? sessionStorage.getItem(key) : '';
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItemFromSession = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return sessionStorage.setItem(key, stringify);
};

const removeItemFromSession = (key) => {
  sessionStorage.removeItem(key);
};

export { getItemFromSession, setItemFromSession, removeItemFromSession };
