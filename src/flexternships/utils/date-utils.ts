/**
 * Utility to convert a Date object to epoch time (milliseconds since 1970-01-01)
 * @param date - The Date object to be converted.
 * @returns The epoch time as a number.
 */
export function dateToEpoch(date: Date): number {
  if (!(date instanceof Date)) {
    throw new TypeError('Expected a Date object');
  }
  return date.getTime();
}

/**
 * Utility to convert epoch time to a Date object
 * @param epoch - The epoch time (milliseconds since 1970-01-01).
 * @returns A Date object representing the epoch time.
 */
export function epochToDate(epoch: number): Date {
  if (typeof epoch !== 'number') {
    throw new TypeError('Expected a number');
  }
  return new Date(epoch);
}

/**
 * Utility to calculate the difference in days between two epoch times.
 * @param epoch1 - The first epoch time (in milliseconds).
 * @param epoch2 - The second epoch time (in milliseconds).
 * @returns The number of days of difference as an integer.
 */
export function epochDifferenceInDays(epoch1: number, epoch2: number): number {
  if (typeof epoch1 !== 'number' || typeof epoch2 !== 'number') {
    throw new TypeError('Expected numbers');
  }
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diffInMs = Math.abs(epoch1 - epoch2);
  return Math.floor(diffInMs / millisecondsInDay);
}

/**
 * Function to add a specified number of days to an epoch time.
 * @param epoch - The original epoch time (in milliseconds).
 * @param days - The number of days to add.
 * @returns The new epoch time (in milliseconds) after adding the specified days.
 */
export function addDaysToEpoch(epoch: number, days: number): number {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  return epoch + days * millisecondsInDay;
}

/**
 * Converts epoch time to a human-readable date format.
 * @param epoch - The epoch time in milliseconds since 1970-01-01.
 * @param truncateYear - Optional. If true, displays year in 2-digit format. Default is false.
 * @returns A formatted date string (e.g., "Sep 30, 2024" or "Sep 30, 24" if truncateYear is true).
 * @throws {TypeError} If epoch is not a number.
 */
export function formatEpochToHumanReadable(epoch: number, truncateYear = false, includeTime = false): string {
  if (typeof epoch !== 'number') {
    throw new TypeError('Expected a number for epoch');
  }

  const date = new Date(epoch);
  const options: Intl.DateTimeFormatOptions = {
    year: truncateYear ? '2-digit' : 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return date.toLocaleDateString('en-US', options);
}

/**
 * Utility to get today's date as a Date object.
 * @returns A Date object representing today's date at 00:00:00 hours.
 */
export function getTodayDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Calculates the number of days left between current timestamp and a reference timestamp
 * Returns positive days if reference is in future, negative if in past
 * Returns 1 for 0-24 hours, 2 for 24-48 hours, and so on
 * @param currentEpoch - Current timestamp in milliseconds
 * @param referenceEpoch - Reference timestamp in milliseconds to compare against
 * @returns Number of days left (can be negative if reference is in past)
 */
export function getDaysLeft(currentEpoch: number, referenceEpoch: number): number {
  if (typeof currentEpoch !== 'number' || typeof referenceEpoch !== 'number') {
    throw new TypeError('Expected numbers for timestamps');
  }

  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diffInMs = referenceEpoch - currentEpoch;
  const diffInDays = diffInMs / millisecondsInDay;

  // For positive differences (future dates)
  if (diffInDays > 0) {
    return Math.ceil(diffInDays);
  }
  // For negative differences (past dates)
  return Math.floor(diffInDays);
}
/**
 * Converts milliseconds to a human readable duration string
 * @param epoch - Duration in milliseconds
 * @returns A formatted duration string (e.g., "2 days 3 hours 30 minutes" or "45 minutes").
 * Does not include months or years in the output.
 * @throws {TypeError} If epoch is not a number
 */
export function formatEpochToDuration(epoch: number): string {
  if (typeof epoch !== 'number') {
    throw new TypeError('Expected a number for epoch');
  }

  const days = Math.floor(epoch / (1000 * 60 * 60 * 24));
  const hours = Math.floor((epoch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((epoch % (1000 * 60 * 60)) / (1000 * 60));

  const parts = [];
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }

  return parts.join(' ');
}
