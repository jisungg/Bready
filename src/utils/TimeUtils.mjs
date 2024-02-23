/**
 * Delays the execution using a Promise.
 *
 * @param {number} [time=10] - The time to delay in milliseconds. Default is 10 milliseconds.
 * @returns {Promise<number>} - A Promise that resolves with the value 2 after the specified delay.
 */
export const delay = (time = 10) => {
  return new Promise((r, _) => setTimeout(() => r(2), time));
};

/**
 * Formats the provided duration in milliseconds into a string representation.
 *
 * @param {number} duration - The duration in milliseconds.
 * @returns {string} - A string representation of the duration in the format "X.XX Sec(s)".
 */
export function onlySecondDuration(duration) {
  const time = Math.floor((duration / 1000) * 100) / 100;
  return `${time} Sec${time !== 1 ? "s" : ""}`;
}

/**
 * Converts a number to a string with leading zero if necessary.
 *
 * @param {number} n - The number to convert.
 * @returns {string} - The string representation of the number with a leading zero if less than 10.
 */
export const set2string = (n) => {
  if (!n) return "00";
  return n < 10 ? "0" : "";
};

/**
 * Formats the provided number of milliseconds into a string representation.
 *
 * @param {number} n - The number of milliseconds.
 * @returns {string} - The string representation of the milliseconds with leading zeros if necessary.
 */
export const formatMS = (n) => {
  if (!n) return "000";
  return n + (Number(n) < 100 ? "0" : "");
};

/**
 * Gets the current date and time in a formatted string.
 *
 * @param {number} [timestamp=Date.now()] - The timestamp to convert to a date string. Defaults to the current timestamp.
 * @returns {string} - The formatted date string in the format "Day DD-MM-YYYY HH:mm:ss.SSSS".
 */
export const getDateTimeString = (timestamp = Date.now()) => {
  const date = new Date(timestamp);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const DD = set2string(date.getDate()); //The Day
  const MM = set2string(date.getMonth() + 1); //The Month
  const YYYY = date.getFullYear(); //The Year
  const HH = set2string(date.getHours()); //Hours
  const mm = set2string(date.getMinutes()); //Minutes
  const ss = set2string(date.getSeconds()); //Seconds
  const SSSS = formatMS(date.getMilliseconds()); //Milliseconds
  const ddd = days[date.getDay()]; //get the day of the week
  //ddd DD-MM-YYYY HH:mm:ss.SSSS
  return `${ddd} ${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss}.${SSSS}`;
};

/**
 * Object containing conversion functions for seconds to other time units.
 */
export const Second = {
  /** @param {number} time */
  Minute: (time = 1) => time * 60,
  /** @param {number} time */
  Hour: (time = 1) => time * 60 * 60,
  /** @param {number} time */
  Day: (time = 1) => time * 60 * 60 * 24,
  /** @param {number} time */
  Week: (time = 1) => time * 60 * 60 * 24 * 7,
};

/**
 * Object containing conversion functions for milliseconds to other time units.
 */
export const Millisecond = {
  /** @param {number} time */
  Second: (time = 1) => time * 1000,
  /** @param {number} time */
  Minute: (time = 1) => time * 1000 * 60,
  /** @param {number} time */
  Hour: (time = 1) => time * 1000 * 60 * 60,
  /** @param {number} time */
  Day: (time = 1) => time * 1000 * 60 * 60 * 24,
  /** @param {number} time */
  Week: (time = 1) => time * 1000 * 60 * 60 * 24 * 7,
};

/**
 * Formats a duration value into a string representation.
 *
 * @param {number} value - The duration value to format.
 * @param {boolean} [inputAsMs] - Set to true if the input value is in milliseconds. Default is false.
 * @returns {string[]} - An array of strings representing the formatted duration.
 */
const formatDuration = (value, inputAsMs) => {
  let times = [86400, 3600, 60, 1];
  if (inputAsMs) times = [...times.map((x) => x * 1000), 1];
  return times
    .reduce((acc, cur) => {
      const res = ~~(value / cur);
      value -= res * cur;
      return [...acc, res];
    }, [])
    .map((x, i) => {
      if (!x) return undefined;
      const text = ["Day", "Hr", "Min", "Sec", "ms"][i];
      return `${x} ${text}${i <= 3 && x !== 1 ? "s" : ""}`;
    })
    .filter(Boolean);
};

/**
 * Converts a duration value in seconds to a formatted string.
 *
 * @param {number} value - The duration value in seconds.
 * @returns {string} - The formatted duration string in the "HH:mm:ss" format.
 */
export const durationSeconds = (value) => {
  let values = [3600, 60, 1].reduce((acc, cur) => {
    let res = ~~(value / cur);
    value -= res * cur;
    return [...acc, res];
  }, []);

  if (values[0] == 0) values.shift();
  return values.map((v) => `${v < 10 ? `0${v}` : v}`).join(":");
};
