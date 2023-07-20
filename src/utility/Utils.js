import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { DateTime } from 'luxon';
import theme from '../configs/themeVariables';
import { CompleteProfileDetailsCta } from './constants/CompleteProfileDetailsCta';

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value;
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: 'short', day: 'numeric' };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line no-undef
export const isUserLoggedIn = () => localStorage.getItem('userData');
// eslint-disable-next-line no-undef
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'admin') return '/home';
  if (userRole === 'client') return '/access-control';
  return '/login';
};

// ** React Select Theme Colors
export const selectThemeColors = (themes) => ({
  ...themes,
  colors: {
    ...themes.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: 'rgba(1, 133, 228, 0.7)', // for selected option bg-color
    neutral10: 'rgba(1, 133, 228, 0.7)', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed', // for input hover border-color
  },
});

export const validations = {
  email: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email address'),
  password: Yup.string()
    .trim()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Incorrect password',
    ),
  newPassword: Yup.string()
    .trim()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one special case character.',
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Password does not match'),
  mobile: Yup.string()
    .trim()
    .matches(/^[0-9]/, 'Min. 10 characters required'),
  ssn: Yup.string()
    .trim()
    .matches(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/, 'Invalid SSN.'),
};

const checkSize = (width) => {
  // eslint-disable-next-line no-undef
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener(
      'resize',
      () => {
        // eslint-disable-next-line no-undef
        const ismobile = window.innerWidth < width;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false,
    );
  }, [isMobile]);
  return isMobile;
};
export const useIsMobile = () => checkSize(1024);
export const useIsTab = () => checkSize(769);

export const convertTo12HourFormat = (hour) => {
  const now = DateTime.local();
  // Set the time to 22:00 (10 PM)
  const convertedTime = now.set({ hour, minute: 0 });

  // Format the DateTime object as 10 PM
  return convertedTime.toFormat('hh:mm a').toLowerCase();
};

export const giveStrokeColor = (percentage) => {
  if (percentage <= 40) {
    return theme.red;
    // eslint-disable-next-line
  } else if (percentage > 40 && percentage <= 70) {
    return theme.progressBarOrange;
  } else {
    return theme.green;
  }
};

export const giveProgressBarColorClassName = (percentage) => {
  if (percentage <= 40) {
    return 'progress-bar-danger';
    // eslint-disable-next-line
  } else if (percentage > 40 && percentage <= 70) {
    return 'progress-bar-warning';
  } else {
    return 'progress-bar-success';
  }
};

const isEmpty = (value) => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

const hasEmptyKeys = (obj) => Object.values(obj).some((value) => isEmpty(value));

export const removeEmptyKeys = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const filteredArray = obj.filter((item) => typeof item !== 'object' || !hasEmptyKeys(item));

    return filteredArray.map((item) => removeEmptyKeys(item));
  }

  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      const cleanedValue = removeEmptyKeys(value);
      if (!isEmpty(cleanedValue)) {
        filteredObj[key] = cleanedValue;
      }
    } else if (!isEmpty(value)) {
      filteredObj[key] = value;
    }
  });

  if (isEmpty(filteredObj)) {
    return undefined;
  }

  return filteredObj;
};

export const returnFilteredDropdownOptions = (search, options) =>
  options.filter(
    (option) =>
      option.label.toLowerCase().startsWith(search.toLowerCase()) ||
      option.label.toLowerCase().includes(search.toLowerCase()),
  );

export const returnDetailsForMarketPlace = (userType, missingValues) => {
  if (missingValues?.includes('educational_institute')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'educational_institute');
  }
  return null;
};
