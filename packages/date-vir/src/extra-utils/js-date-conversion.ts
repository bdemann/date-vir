import {toTimestamp} from '../formatting/timestamp.js';
import {type FullDate} from '../full-date/full-date-shape.js';
import {userTimezone} from '../timezone/timezones.js';

/**
 * Convert a {@link FullDate} from a built-in JS
 * [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date).
 *
 * @category Conversion
 * @example
 *
 * ```ts
 * import {toJsDate, type FullDate} from 'date-vir';
 *
 * const exampleDate: Readonly<FullDate> = {
 *     year: 2024,
 *     month: 1,
 *     day: 5,
 *     hour: 1,
 *     minute: 1,
 *     second: 1,
 *     millisecond: 1,
 *     timezone: 'UTC',
 * };
 *
 * toJsDate(exampleDate);
 * ```
 */
export function toJsDate(fullDate: Readonly<FullDate>): Date {
    // Fast path: for user-timezone dates the JS Date local-time constructor
    // produces the same result as the Luxon round-trip and avoids the overhead.
    if (fullDate.timezone === userTimezone) {
        return new Date(
            fullDate.year,
            fullDate.month - 1, // JS Date months are 0-indexed
            fullDate.day,
            fullDate.hour,
            fullDate.minute,
            fullDate.second,
            fullDate.millisecond,
        );
    }
    return new Date(toTimestamp(fullDate));
}
