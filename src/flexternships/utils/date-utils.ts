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
 * Utility to convert epoch time to a human-readable date format.
 * @param epoch - The epoch time (milliseconds since 1970-01-01).
 * @returns A formatted date string (e.g., "Sep 30, 2024").
 */
export function formatEpochToHumanReadable(epoch: number): string {
    if (typeof epoch !== 'number') {
        throw new TypeError('Expected a number for epoch');
    }

    const date = new Date(epoch);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
}