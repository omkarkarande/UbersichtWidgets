/**
 * Uses Date object to retrieve hours and minutes.
 * Uses the 12H format, and computes the AM/PM period based on the hour value.
 */
export function fetchCurrentTime() {
    var now = new Date();
    return {
        "hours": now.getHours() % 12 || 12,
        "minutes": now.getMinutes(),
        "period": (now.getHours() < 12 || now.getHours() === 24) ? "AM" : "PM"
    };
};

/**
 * Uses locale parsing to convert date to the needed format.
 * Parse output to generate weekday and date string.
 */
export function fetchCurrentDate() {
    // This will return a formatted date - Weekday, DD MMM YYYY
    const now =  new Date().toLocaleString('en-GB', {
      day: "2-digit",
      weekday: "long",
      month: "long",
      year: "numeric",
    });

    const [weekday, day, month, year] = now.split(" ");
    // Parse string into separate entities
    return {
        "weekday": weekday,
        "day": day,
        "month": month,
        "year": year
    };
};

/**
 * Gets an appropriate greeting for the given hour.
 * @param {number} hours
 */
export function fetchGreeting(hours, period) {
    if (period === "PM") {
        if (hours < 5) return "afternoon";
        return "evening";
    }
    return "morning";
};
