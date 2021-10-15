/* eslint-disable react/react-in-jsx-scope */

// Imports
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// User Config
const userConfig = require("./user_config.json");

// Emotion styles
const container = css`
    width: 28vw;
    height: 42vh;
    max-width: 640px;
    margin: 28vh 0 0 8vw;
`;

const day = css`
    font-family: "Din Condensed";
    font-size: 48vh;
    opacity: 12%;
    -webkit-mask-image: -webkit-gradient(linear, right top, right bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
`;

const month = css`
    font-family: "Dank Mono Italic";
    font-weight: 500;
    font-size: 8vh;
    text-transform: lowercase;
    color: #161616;
    margin: -40vh 0 0 110px;
`;

const clock = css`
    color: #161616;
    width: 6.6vw;
    min-width: 132px;
    font-family: "Montserrat Bold";
    font-size: 2vh;
    border-bottom: 2px solid #161616;
    margin: 0 0 0 118px;
`;

const weatherContainer = css`
    font-family: "Montserrat";
    font-size: 1.3vh;
    margin: 2vh 0 0 118px;
    color: #161616
`;

const weekday = css`
    font-family: "Din Condensed";
    font-size: 1.6vh;
    letter-spacing: 0.7em;
    writing-mode: vertical-lr;
    text-transform: uppercase;
    text-orientation: sideways;
    transform: rotate(180deg);
    margin: -9.6vh 0 0 60px;
`;



// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 20000;

// Command to be executed at every {refreshInterval}.
export const command = () => {
    return {
        "time": fetchCurrentTime(),
        "date": fetchCurrentDate(),
        "weather": fetchCurrentWeather(userConfig["location"], userConfig["openweathermapApiKey"])
    };
};

// Main render function to draw up the widget.
export const render = ({output, error}) => {

    const {time, date, weather} = output;

    return (
        <div className={container}>
            {/* Big day in the background */}
            <div className={day}>
                {String(date["day"]).padStart(2, "0")}
            </div>
            {/* Month */}
            <div className={month}>
                {date["month"]}
            </div>
            {/* Current Time*/}
            <div className={clock}>
                {String(time["hours"]).padStart(2, "0")}:{String(time["minutes"]).padStart(2, "0")} {time["period"]}
            </div>
            {/* Weather */}
            { weather === undefined ?
                (<div className={weatherContainer}>Fetching weather...</div>) :
                (<div className={weatherContainer}>
                    Current weather in <i>{weather["location"]}</i> is <i>{weather["condition"]}</i>.
                    <br></br><br></br>
                    Temprature is around <i>{weather["temprature"]}°C</i>, wind speed is <i>{weather["windSpeed"]}km/h</i>, and humidity about <i>{weather["humidity"]}%</i>
                </div>)
            }
            {/* Weekday String */}
            <div className={weekday}>
                {date["weekday"]}
            </div>
        </div>
    );
};
