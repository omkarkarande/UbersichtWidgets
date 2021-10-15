const cache = require('js-cache');
const CACHE_TTL = 3600000; //milliseconds. 1 hour.

/**
 * Uses OpenWeatherMap to fetch current weather conditions for the given location.
 * Needs user defined API key for access.
 *
 * Uses cached values to prevent large number of calls to the API.
 * Cache is set to expire each hour, so this should make at most 1 call per hour.
 * @param {string} location
 * @param {string} apiKey
 */
const fetchCurrentWeather = (location, apiKey) => {
    // Update cached weather if it has expired
    if (cache.get("weather") === undefined) {
        // API call to update weather here.
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then((data) => {
                // Parse data for things we need.
                cache.set("weather", {
                    "location": data["name"],
                    "condition": data["weather"][0]["description"], //Picking the first always.
                    "temprature": Math.round(data["main"]["temp"]),
                    "windSpeed": Math.round(data["wind"]["speed"]),
                    "humidity": data["main"]["humidity"]
                }, CACHE_TTL);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return cache.get("weather");
};

export { fetchCurrentWeather };
