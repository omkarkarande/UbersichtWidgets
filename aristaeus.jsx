/* eslint-disable react/react-in-jsx-scope */

// Imports
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime, fetchGreeting } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// 3P requires
const numberConverter = require("number-to-words");

// User Config
const userConfig = require("./user_config.json");

// Emotion styles
const container = css`
    width: 28vw;
    height: 42vh;
    max-width: 640px;
    margin: 28vh 0 0 8vw;
    font-smooth: auto;
`;

const hello = css`
    color: #666;
    font-family: 'Bebas Regular';
    font-size: 3.6vh;
`;

const name = css`
    color: #ccc;
    text-transform: lowercase;
    font-family: 'Caviar Dreams Bold';
    letter-spacing: -5px;
    font-size: 8vh;
    margin-top: -6.4vh;
    margin-left: -5px;
`;

const infobox = css`
    margin-top: -80px;
    margin-left: 18px;
    padding-top: 50px;
    min-height: 10vh;
    border-left: 2px solid #1f1f1f;
`;

const weekday = css`
    margin-left: -2vh;
    margin-top: -96px;
    padding-top: 10vh;
    color: #ccc;
    font-family: "Abel Regular";
    font-size: 1.4vh;
    letter-spacing: 0.2em;
    writing-mode: vertical-lr;
    text-align: left;
    text-transform: uppercase;
    text-orientation: sideways;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
`;

const month = css`
    color: #333;
    font-family: "Abel Regular";
    font-size: 3.6vh;
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    text-transform: lowercase;
    text-orientation: sideways;
    padding-top: 8vh;
    margin-left: -0.6vh;
`;

const inlineContainer = css`
    disply: inline-block;
    margin-bottom: 12px;
`;

const leftOfSeparator = css`
    color: #ccc;
    font-size: 1.2vh;
    font-family: "Abel Regular";
    margin-left: -1.8vh;
`;

const rightOfSeparator = css`
    color: #444;
    font-size: 0.9vh;
    text-transform: uppercase;
    font-family: "Abel Regular";
    margin-left: 1vh;
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
            {/* Big greeting on top */}
            <div>
                <p className={hello}>Hello,</p>
                <p className={name}>{userConfig["user"]}</p>
            </div>



            <div className={infobox}>
                {/* Time */}
                <div className={inlineContainer}>
                    <span className={leftOfSeparator}>{String(time["hours"]).padStart(2, "0")}</span>
                    <span className={rightOfSeparator}>{numberConverter.toWords(time["minutes"])}</span>
                </div>

                {/* Weather */}
                {weather === undefined ?
                    (<div className={rightOfSeparator}>Fetching...</div>) :
                    (<div className={inlineContainer}>
                        <span className={leftOfSeparator}>{String(weather["temprature"]).padStart(2, "0")}</span>
                        <span className={rightOfSeparator}>{weather["condition"]}</span>
                    </div>)
                }

                {/* Vertical Month */}
                <div className={month}>
                    {date["day"]} {date["month"]}
                </div>

                {/* Vertical Weekday */}
                <div className={weekday}>
                    {date["weekday"]}
                </div>
            </div>
        </div>
    );
};
