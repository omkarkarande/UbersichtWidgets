/* eslint-disable react/react-in-jsx-scope */

// Imports
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// 3P requires
const numberConverter = require("number-to-words");

// User Config
const userConfig = require("./user_config.json");

// Emotion styles
const container = css`
    width: 50vw;
    height: 50vh;
    display: flex;
    align-items: center;
    margin-left: 50%;
    margin-top: 20vh;
`;

const overlayBox = css`
    z-index: 1;
    width: 100%;
    margin-top: 6vh;
    color: white;
    text-align: center;
`;

const day = css`
    width: 100%;
    padding-top: 5vh;
    position: absolute;
    color: #333;
    font-family: "Tahu!";
    font-size: 50vh;
    text-align: center;
`;

const month = css`
    font-family: "High Summit";
    font-size: 16vh;
    text-transform: capitalize;
`;

const weekday = css`
    margin-top: -8vh;
    font-family: "High Summit";
    font-size: 5vh;
    text-transform: lowercase;
`;

const timeStyle = css`
    font-family: "Montserrat";
    font-size: 1.6vh;
    text-transform: uppercase;
    margin-top: 4vh;
`;

const weatherStyle = css`
    font-family: "Montserrat";
    font-size: 1vh;
    text-transform: uppercase;
`;

// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 15000;

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
            <div className={day}>
                {date["day"]}
            </div>

            <div className={overlayBox}>
                <div className={month}>
                    {date["month"]}
                </div>
                <div className={weekday}>
                    {date["weekday"]}
                </div>
                <div className={timeStyle}>
                    {numberConverter.toWords(time["hours"])} <b>{numberConverter.toWords(time["minutes"])}</b>
                </div>

                { weather === undefined ?
                    (<div className={weatherStyle}>Fetching weather...</div>) :
                    (<div className={weatherStyle}>
                        {weather["temprature"]}°C | {weather["condition"]}
                    </div>)
                }
            </div>
        </div>
    );
};
