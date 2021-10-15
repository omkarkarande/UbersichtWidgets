/**
 * Uses Date object to retrieve hours and minutes.
 * Uses the 12H format, and computes the AM/PM period based on the hour value.
 */
const fetchCurrentTime = () => {
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
const fetchCurrentDate = () => {
    // This will return a formatted date - Weekday, DD MMM YYYY
    const now =  new Date().toLocaleString('en-GB', {
      day: "2-digit",
      weekday: "long",
      month: "long",
      year: "numeric",
    }).split(",").map((item) => item.trim());

    const [day, month, year] = now[1].split(" ");
    // Parse string into separate entities
    return {
        "weekday": now[0],
        "day": day,
        "month": month,
        "year": year
    };
};

/**
 * Gets an appropriate greeting for the given hour.
 * @param {number} hours
 */
const fetchGreeting = (hours) => {
    if (hours < 12) return "morning";
    if (hours < 18) return "afternoon";
    return "evening";
};

export { fetchCurrentTime, fetchCurrentDate, fetchGreeting };
