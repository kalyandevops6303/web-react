import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { FileText } from 'react-feather';
import theme from '../configs/themeVariables';
import DateTime from '../lib/date-time';
import toast from '../lib/toast';
import round from '../lib/round';
import { CompleteProfileDetailsCta } from './constants/CompleteProfileDetailsCta';
import {
  CUSTOMER_SUPPORT_TYPES,
  SUPPORT_EMAIL,
  bidStatus,
  checkPoints,
  fileScanStatus,
  maxFileSize,
  timeDalayToRetryScanning,
  userTypes,
} from './constants/Constant';
import ShowToastMessage from '../@core/components/toast';
import { ERROR } from './constants/ToastTypes';
import { AccordionName } from '../views/dashboard/overview/DashboardConstant';
import PDFIcon from '../assets/images/pdfV2.svg';
import DocIcon from '../assets/images/DOC.svg';
import TextIcon from '../assets/images/TXT.svg';
import JPGIcon from '../assets/images/JPG.svg';
// eslint-disable-next-line import/no-cycle
import fileScanningService from '../services/fileUploadService';
import { isFlexternshipApp } from '@/configs/api/env';
import { MessageRole, MessageType } from '@flexternships/enums/core-enums';

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
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords Do not match'),
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

export const isEmpty = (value) => {
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

export const hasEmptyKeys = (obj) => Object.values(obj).some((value) => isEmpty(value));

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

export const convertUnixTimestampToDate = (timestamp, timeZone, isFlextern = false) => {
  // Create a new Date object adjusted to UTC from the timestamp
  let timezoneToUse = timeZone;
  if (!timeZone) {
    timezoneToUse = isFlextern ? 'Asia/Kolkata' : 'America/Los_Angeles';
  }
  if (!timestamp) {
    return '';
  }
  const date = new Date(timestamp);

  // Adjust date to the specified timeZone
  const adjustedDate = new Date(date.toLocaleString('en-US', { timeZone: timezoneToUse }));

  // Format the adjusted date to 'Jul 23, 24' style
  const formattedOutput = adjustedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedOutput;
};

export function calculateDays(timestamp1, timestamp2) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const daysBetween = Math.floor(Math.abs(timestamp1 - timestamp2) / millisecondsPerDay);

  const currentTimestamp = Date.now();
  const daysLeft = timestamp1 > currentTimestamp ? Math.floor((timestamp1 - currentTimestamp) / millisecondsPerDay) : 0;

  return { daysBetween, daysLeft };
}

export const renderFormattedListingDate = (date) => {
  const formattedDate = date
    .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    .replace(',', '')
    .split(' ');

  return `${formattedDate[1]} ${formattedDate[0]} '${formattedDate[2]?.slice(2, 4)}`;
};

export const returnRelativeTime = (time, timeZone) => {
  const givenDate = new Date(time);

  const now = new Date().toLocaleString('en-US', { timeZone });

  const currentDate = new Date(now);

  const difference = currentDate.getTime() - givenDate.getTime();

  const timeAgo = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);

    if (seconds < 60) {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    }
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    const days = Math.floor(seconds / 86400);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  return timeAgo(difference);
};

export const formatDateWithDash = (date) => {
  if (!date) {
    return undefined;
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

export const returnDetailsForMarketPlace = (userType, missingValues) => {
  if (missingValues?.includes('educational_institute')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'educational_institute');
  }
  return null;
};

// eslint-disable-next-line consistent-return
export const isUrlWithoutProtocol = (value) => {
  if (value?.length > 0) {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)?$/i;
    return urlPattern.test(value);
    // eslint-disable-next-line no-else-return
  } else {
    return true;
  }
};

export const formatUrl = (link) => {
  if (link) {
    if (
      link?.startsWith('http://') ||
      link?.startsWith('https://') ||
      link?.startsWith('Http://') ||
      link?.startsWith('Https://')
    ) {
      return link.toLowerCase();

      // eslint-disable-next-line no-else-return
    } else {
      return `https://${link.toLowerCase()}`;
    }
    // eslint-disable-next-line no-else-return
  } else {
    return undefined;
  }
};
export const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const isFileValid = (file) => {
  if (file.size > maxFileSize) {
    ShowToastMessage(ERROR, `${file.name} size exceeds the maximum limit (5MB).`);
    return false;
  }
  return true;
};

export const renderFilePreview = (file) => {
  const name = file?.name || file?.file_name;
  if (name?.toLowerCase().endsWith('.jpeg') || name?.toLowerCase().endsWith('.jpg')) {
    return <img className="rounded me-75 mb-25" alt="pdf" src={JPGIcon} height="22" width="22" />;
  }
  if (name?.toLowerCase().endsWith('.txt')) {
    return <img className="rounded me-75 mb-25" alt="pdf" src={TextIcon} height="22" width="22" />;
  }
  if (name?.toLowerCase().endsWith('.pdf')) {
    return <img className="rounded me-75 mb-25" alt="pdf" src={PDFIcon} height="22" width="22" />;
  }
  if (name?.toLowerCase().endsWith('.doc') || name?.toLowerCase().endsWith('.docx')) {
    return <img className="rounded me-75 mb-25" alt="pdf" src={DocIcon} height="22" width="22" />;
  }
  return <FileText size="18" className="me-75 mb-25" />;
};

export const getFileSize = (size) => {
  if (Math.round(size / 100) / 10 > 1000) {
    return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
  }
  return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
};

export const getProjectStatus = ({ status, type }) => {
  switch (status) {
    case 'SIGNED':
      return `Signed - ${type === 'CONTRACT' ? 'Contract' : 'NDA'} Document`;
    case 'TERMINATED':
      return `Terminated - Early Termination of ${type === 'CONTRACT' ? 'contract' : 'NDA'}`;
    case 'PROJECT_FUNDED':
      return 'Project Funded';
    case 'PROJECT_COMPLETED':
      return 'Project Completed';
    default:
      return '';
  }
};
export const getTimeLineDotColor = (status) => {
  switch (status) {
    case 'SIGNED':
      return theme.orangeColor;
    case 'TERMINATED':
      return theme.red;
    case 'PROJECT_FUNDED':
      return theme.timelineSuccessColor;
    case 'PROJECT_COMPLETED':
      return theme.purpleColor;
    default:
      return '';
  }
};

// Helper function to get the day with ordinal suffix
const getDayWithOrdinalSuffix = (day) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const relevantDigits = day < 30 ? day % 20 : day % 30;
  const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
  return `${day}${suffix}`;
};

export const formattedDate = (value) => {
  if (!value) return value;

  // Split the input date string into day, month, and year
  const [day, month, year] = value.split('-').map(Number);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return value;

  // Add the ordinal suffix to the day
  const dayWithOrdinal = getDayWithOrdinalSuffix(day);

  // Get the month name based on the month number
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[month - 1];

  // Format the date string
  const formattedDateString = `${dayWithOrdinal} ${monthName} ${year}`;

  return formattedDateString;
};

export const returnFormattedRating = (num) => (num ? round(num, 1) : 0);

export const downloadFile = async ({ data, file_name }) => {
  // Replace 'your_file_url' with the actual URL of the file you want to download
  const fileUrl = data?.download_url;

  try {
    toast.loading('Downloading file...');
    // Fetch the file using the URL
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a blob URL for the file
    const blobUrl = URL.createObjectURL(blob);

    // Create a hidden anchor element
    // eslint-disable-next-line no-undef
    const a = document.createElement('a');
    a.style.display = 'none';

    // Set the href attribute to the blob URL
    a.href = blobUrl;

    // Set the download attribute with the extracted file name
    a.download = file_name || data?.file_name;

    // Append the anchor element to the document
    // eslint-disable-next-line no-undef
    document.body.appendChild(a);

    // Trigger a click on the anchor element to start the download
    a.click();

    // Remove the anchor element and revoke the blob URL from the document
    // eslint-disable-next-line no-undef
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
    toast.dismiss();
  } catch (error) {
    console.error('Error downloading the file:', error);
    toast.dismiss();
  }
};
export const downloadUploadedFile = async ({ file }) => {
  toast.loading('Downloading file...');

  try {
    // Convert the binary file data into a Blob
    const blob = new Blob([file]);

    // Create a URL for the Blob
    // eslint-disable-next-line no-undef
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element
    // eslint-disable-next-line no-undef
    const a = document.createElement('a');

    // Set the href to the Blob URL
    a.href = url;

    // Set the download attribute to the file name
    a.download = file?.name || 'document';

    // Append the anchor to the body
    // eslint-disable-next-line no-undef
    document.body.appendChild(a);

    // Click the anchor to start the download
    a.click();

    // Remove the anchor from the body
    a.remove();

    // Revoke the URL to free up memory
    // eslint-disable-next-line no-undef
    window.URL.revokeObjectURL(url);
    toast.dismiss();
  } catch (error) {
    // Handle any errors
    console.error('Error downloading file:', error);
    toast.error('Error downloading file');
  }
};

export const truncateSentence = ({ sentence, maxCharacters }) => {
  // Check if the sentence exceeds the maximum number of characters
  if (sentence?.length > maxCharacters) {
    // Truncate the sentence to the maximum number of characters
    const truncatedSentence = `${sentence?.substring(0, maxCharacters)}...`;

    return truncatedSentence;
  }
  // If the sentence is within the limit, return it as is
  return sentence;
};

export const getPath = ({ isActiveProject, projectId, isFlextern = false }) => {
  const location = useLocation();
  const isDashboard = location.pathname.split('/').includes('dashboard');
  if (location.pathname.split('/').includes('projects')) {
    if (location.pathname.split('/').includes('ongoing')) {
      return `/project-details/${projectId}/milestone`;
    }
    if (location.pathname.split('/').includes('completed')) {
      return `/project-details/${projectId}/rating`;
    }
    return `/project-details/${projectId}/bid`;
  }
  if (isFlextern) {
    return `/project-details/${projectId}/team`;
  }
  if (isDashboard) {
    if (isActiveProject) {
      return `/project-details/${projectId}/milestone`;
    }
    return `/project-details/${projectId}/bid`;
  }
  return `/project-details/${projectId}/bid`;
};

export const calculateRemainingBidsCount = (data) => {
  const totalRecords = data?.metadata?.total_records || 0;
  const currentRecords = data?.data?.length || 0;
  return totalRecords - currentRecords;
};

export const getReadType = ({ primaryFilter, secondFilterState, userType }) => {
  const { sort_by = [], invited_by = [], user_type = [], invite_type = [] } = secondFilterState || {};

  switch (primaryFilter.toLowerCase()) {
    case 'ongoing':
      return AccordionName.activeProjects;
    case 'upcoming':
      return AccordionName.upcomingProjects;
    case 'my_bids':
      return AccordionName.receivedBids;
    case 'all_listings':
      if (sort_by.some((item) => item.value === 'RECOMMENDED')) {
        return AccordionName.recommendedProjects;
      }
      break;
    case 'invited':
      if (invited_by.some((item) => item.value === 'TEAM')) {
        return AccordionName.teamInvitation;
      }
      break;
    case 'teams':
      if (sort_by.some((item) => item.value === 'RECOMMENDED')) {
        return AccordionName.recommendedTeams;
      }
      break;
    case 'talents':
      if (sort_by.some((item) => item.value === 'RECOMMENDED')) {
        return AccordionName.recommendedTalents;
      }
      break;
    case 'recommendation':
      if (user_type.some((item) => item.value === 'TALENT')) {
        return AccordionName.recommendedTalents;
      }
      if (user_type.some((item) => item.value === 'TEAM')) {
        return AccordionName.recommendedTeams;
      }
      break;
    case 'join_requests':
      if (invite_type.some((item) => item.value === 'RECEIVED')) {
        return userType === 'TALENT' ? AccordionName.teamInvitation : AccordionName.joinRequest;
      }
      break;
    default:
      break;
  }

  return '';
};

export const getModifiedProjectResponse = ({ data }) => {
  const project = data?.project;

  if (isFlexternshipApp) {
    return {
      _id: project?._id,
      is_invited: project?.is_invited,
      client: {
        user_id: data.client._id,
        departmentName: data.client.department || data.client.department_name,
      },
      requirements: {
        projectName: project.name,
        estimatedStartDate: project.expected_start_date,
        estimatedDuration: project.duration,
        estimatedWeeklyHours: project.duration_hours_per_week,
        totalProjectHoursEach: (project.duration || 0) * (project.duration_hours_per_week || 0),
        projectDescription: project?.description,
        documents: project?.documents?.map((doc) => ({
          fileName: doc.file_name,
          fileKey: doc.file_key,
          downloadUrl: doc.download_url,
          size: doc.size,
          createdAt: doc.created_at,
        })),
      },
      roles: project?.roles?.map((projectRole) => ({
        role: projectRole?.role,
        count: projectRole?.count,
        skills: projectRole?.proficiency?.skills,
        tools: projectRole?.proficiency?.tools,
      })),
      milestones: project?.milestones?.map((milestone) => ({
        _id: milestone?._id,
        title: milestone?.name,
        duration: milestone?.estimated_duration?.duration,
        description: milestone?.description,
        deliverables: milestone?.deliverables,
      })),
    };
  }
  return {
    _id: project?._id,
    created_at: project?.posted_date,
    status: project?.status,
    has_bid: project?.has_bid,
    is_invited: project?.is_invited,
    nda: {
      is_nda: project?.has_nda,
      nda_link: '',
      is_signed_by_talent: false,
    },
    proficiency: {
      skills: project?.skills_required,
      tools: project?.tools_required,
    },
    listing_details: {
      start_date: '',
      end_date: '',
      start_date_epoch: project?.listing_start_date,
      end_date_epoch: project?.listing_end_date,
    },
    pay_type: {
      currency: {
        _id: '',
        name: project?.currency_name,
        code: project?.currency_symbol,
      },
      variable_cost: project?.pay_type === 'Variable',
      fixed_cost: project?.total_cost,
    },
    details: {
      name: project?.name,
      description: project?.description,
      expected_duration: {
        duration: project?.duration,
        duration_type: project?.duration_type,
      },
      documents: project?.documents,
    },
    availability: {
      timezone: {
        _id: '',
        name: '',
        abbreviation: project?.timezone_abbr,
      },
      time_overlap: project?.time_overlap,
      weekdays_avl: {
        start_time: project?.weekday_start_time,
        end_time: project?.weekday_end_time,
        days: project?.weekdays_avl,
      },
      weekends_avl: {
        start_time: project?.weekend_start_time,
        end_time: project?.weekend_end_time,
        days: project?.weekends_avl,
      },
    },
    client_details: { user_id: data?.client?._id },
    bidders: data?.bidders,
    bids: {
      _id: data?.bid,
      status: data?.bid?.status,
    },
    is_favourite: data?.project?.is_favourite,
  };
};
export const handleLinkOpen = (URL) => {
  if (URL && (URL.startsWith('http://') || URL.startsWith('https://'))) {
    // eslint-disable-next-line no-undef
    window.open(URL, '_blank');
  } else {
    // eslint-disable-next-line no-undef
    window.open(`https://${URL}`, '_blank');
  }
};

export const getStatusColor = (action) => {
  switch (action) {
    case bidStatus.BID_UPDATED:
      return theme.purpleTimelimeColor;
    case bidStatus.BID_REVIEWED:
      return theme.orangeColor;
    case bidStatus.BID_ACCEPTED:
      return theme.timelineSuccessColor;
    case bidStatus.BID_SUBMITTED:
      return theme.purpleTimelimeColor;
    case bidStatus.BID_CHANGE_ACCPETED:
      return theme.timelineSuccessColor;
    case bidStatus.BID_CHANGE_REJECTED:
      return theme.red;
    default:
      return theme.purpleTimelimeColor; // Default color if status is not recognized
  }
};

export const getBidAction = (action) => {
  switch (action) {
    case bidStatus.BID_UPDATED:
      return 'Bid Updated';
    case bidStatus.BID_REVIEWED:
      return 'Bid Reviewed';
    case bidStatus.BID_ACCEPTED:
      return 'Bid Accepted';
    case bidStatus.BID_SUBMITTED:
      return 'Bid Submitted';
    case bidStatus.BID_CHANGE_REQUEST:
      return 'Bid Change Request';
    case bidStatus.BID_CHANGE_ACCPETED:
      return 'Bid Change Accepted';
    case bidStatus.BID_CHANGE_REJECTED:
      return 'Bid Change Rejected';
    default:
      return '';
  }
};

export const handleEmailClick = () => {
  const recipient = SUPPORT_EMAIL;
  const subject = '';
  const body = '';
  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // eslint-disable-next-line no-undef
  window.location.href = mailtoLink;
};

export const isAnyKeyNonEmptyArray = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      return true; // Found non empty array
    }
  }
  return false; // No non empty array found
};

export const scanAndProcessFiles = async ({ fileData, handleMainAPI, onError, isPrivate }) => {
  const processFile = async (index) => {
    if (index >= fileData.length) {
      handleMainAPI();
      return;
    }

    const file = fileData[index];
    try {
      const response = await fileScanningService({ fileKeys: [file], isPrivate });
      if (response.data.data?.[0]?.status === fileScanStatus.SCANNING) {
        // Retry logic
        let retries = 3;
        const retryInterval = setInterval(async () => {
          if (retries <= 0) {
            clearInterval(retryInterval);
            ShowToastMessage(ERROR, `Scanning ${file?.file_name} taking longer than expected. `);
            onError(); // Handle error on too many retries
          } else {
            try {
              const retryResponse = await fileScanningService({ fileKeys: [file], isPrivate });
              if (retryResponse.data.data?.[0]?.status !== fileScanStatus.SCANNING) {
                clearInterval(retryInterval);
                if (retryResponse.data.data?.[0]?.status === fileScanStatus.CLEAN) {
                  processFile(index + 1); // Move to the next file
                } else if (retryResponse.data.data?.[0]?.status === fileScanStatus.THREAT) {
                  onError(); // Handle error for threat
                  ShowToastMessage(ERROR, `${file?.file_name} seems to be malicious/corrupted. `);
                }
              }
            } catch (retryError) {
              console.error('Error retrying file scan:', retryError);
              ShowToastMessage(ERROR, `Error scanning file: ${file?.file_name}`);
              clearInterval(retryInterval); // Stop retrying on error
              onError(); // Handle error for retry
            }
          }
          retries -= 1;
        }, timeDalayToRetryScanning); // Retry every given seconds
      } else if (response.data.data?.[0]?.status === fileScanStatus.CLEAN) {
        processFile(index + 1); // Move to the next file
      } else if (response.data.data?.[0]?.status === fileScanStatus.THREAT) {
        onError(); // Handle error for threat
        ShowToastMessage(ERROR, `${file?.file_name} seem to be maliciuous/corrupted. `);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      onError();
    }
  };

  // Start processing files
  processFile(0);
};

export const getContractStepLabel = ({ isNDA, user_type }) => {
  switch (user_type) {
    case userTypes.client:
      return isNDA ? 4 : 3;
    default:
      return isNDA ? 3 : 2;
  }
};
export const generateToolTipId = (projectName, name, title) =>
  `${projectName ?? name}-${title}`.replace(/[^a-zA-Z0-9-]/g, '-');

export const roundOfAmount = (amount) => (amount ? round(amount, 2) : 0);

export const getMissingName = (type, values) => {
  switch (type) {
    case CUSTOMER_SUPPORT_TYPES.missing_skill:
      return values.skill;
    case CUSTOMER_SUPPORT_TYPES.missing_tool:
      return values.tool;
    case CUSTOMER_SUPPORT_TYPES.missing_institute:
      return values.institute;
    case CUSTOMER_SUPPORT_TYPES.missing_assessment:
      return values.assessment;
    default:
      return '';
  }
};
export const checkPointRedirection = ({ response, navigate }) => {
  if (response?.checkpoint === checkPoints.MOBILE_VERIFICATION) {
    if (response?.is_flextern) {
      navigate('/auth/register-phone-flexternship');
    } else {
      navigate('/auth/register-phone');
    }
  } else if (response?.checkpoint === checkPoints.ACCOUNT_DETAILS) {
    if (response?.app_roles?.includes('FLEXTERN_CLIENT')) {
      navigate(`/${response.user_type.toLowerCase()}-onboarding`);
    } else navigate(`/${response.user_type.toLowerCase()}-onboarding/account-details`);
  } else if (response?.checkpoint === checkPoints.PROFILE_DETAILS) {
    if (response?.app_roles?.includes('FLEXTERN_CLIENT')) {
      navigate(`/${response.user_type.toLowerCase()}-onboarding`);
    } else navigate(`/${response.user_type.toLowerCase()}-onboarding/personal-details`);
  } else if (response?.checkpoint === checkPoints.COMPLETE) {
    navigate('/dashboard');
  } else if (response?.checkpoint === checkPoints?.CREATE_PASSWORD) {
    navigate('/auth/set-password');
  }
};

export function areObjectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const filteredFormSchema = ({ savedData, formSchemaFields }) => {
  const filteredObj = Object.fromEntries(
    Object.keys(savedData) // Get all keys from savedData
      .filter((key) => key in formSchemaFields) // Keep only keys that are in form schema
      .map((key) => [key, savedData[key]]), // Map the key-value pairs for the new object
  );

  return filteredObj;
};

export const formatDateWithTime = (date) => {
  if (!date) return '';

  return new Date(date)
    .toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(',', '')
    .replace(/\s+/g, ' ');
};

export const formatWebSocketMessage = (data) => {
  switch (data.message_type) {
    case MessageType.INITIAL:
    case MessageType.CLARIFICATION:
    case MessageType.NUMBER_REQUEST:
    case MessageType.ERROR:
      return { role: MessageRole.ASSISTANT, content: data.content };
    case MessageType.PROJECTS:
      return {
        role: MessageRole.ASSISTANT,
        content: data.content,
        projects: data.content.projects,
        domain: data.content.domain,
      };
    default:
      return { role: MessageRole.ASSISTANT, content: 'Unsupported message type' };
  }
};
