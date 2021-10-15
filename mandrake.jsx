/* eslint-disable react/react-in-jsx-scope */

// Imports
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// User Config
const userConfig = require("./user_config.json");

// Emotion styles
const container = css`
    margin: 28vh 0 0 128px;
`;

const day = css`
    position: absolute;
    font-family: "Din Condensed";
    font-size: 420px;
    opacity: 15%;
    -webkit-mask-image: -webkit-gradient(linear, right top, right bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
`;

const month = css`
    position: absolute;
    font-family: "Dank Mono Italic";
    font-weight: 500;
    font-size: 72px;
    text-transform: lowercase;
    margin: 140px 0 0 80px;
    color: #161616;
`;

const clock = css`
    width: 100%;
    position: absolute;
    color: #161616;
    font-family: "Montserrat Medium";
    font-size: 20px;
    margin: 220px 0 0 84px;
    border-bottom: 2px solid #161616;
`;

const weekday = css`
    position: absolute;
    margin: 378px 0 0 -124px ;
    font-family: "Din Condensed";
    font-size: 18px;
    letter-spacing: 0.5em;
    writing-mode: vertical-lr;
    text-transform: uppercase;
    text-orientation: sideways;
    transform: rotate(180deg);
`;

const weatherContainer = css`
    width: 250%;
    position: absolute;
    margin: 270px 0 0 84px;
    font-family: "Montserrat";
    font-size: 14px;
`;

// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 1000;

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
            {/* Weekday String */}
            <div className={weekday}>
                wednesday
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
        </div>
    );
};
