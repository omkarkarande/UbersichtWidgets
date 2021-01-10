/* eslint-disable react/react-in-jsx-scope */

// Imports 
import { css, React } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// 3P requires
var numberConverter = require("number-to-words");

// User Config
var userConfig = require("./user_config.json");

// Emotion styles
const container = css`
    padding: 15vh 0 0 20px;
`;

const flexContainer = css`
    display: flex;
`;

const periodContainer = css`
    align-self: flex-end;
    padding: 0 0 14px 8px;
`;

const hours = css`
    color: #3a3a3a;
    font-family: "Roboto Light";
    font-size: 64px;
    text-transform: uppercase;
`;

const minutes = css`
    color: #191919;
    margin-top: -14px;
    font-family: "Roboto Black";
    font-size: 80px;
    text-transform: uppercase;
`;

const period = css`
    padding: 2px 5px 2px 5px;
    color: #444;
    background-color: #ccc;
    font-family: "Roboto";
    font-size: 16px;
    border: 1px solid rgba(0,0,0,0);
    border-radius: 4px;
`;

const infoBox = css`
    margin: 16px 0 24px 4px;
    padding-left: 10px;
    font-family: "Roboto";
    border-left: 4px solid #191919;
`;

const weekday = css`
    padding-bottom: 4px;
    font-size: 20px;
    font-family: "Roboto";
    font-weight: bold;
    text-transform: uppercase;
`;

const weatherBox = css`
    width: 400px;
    overflow-wrap: normal;
`;

// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 15000;

// Command to be executed at every {refreshInterval}.
export const command = () => {
    return {
        "time": fetchCurrentTime(),
        "date": fetchCurrentDate(),
        "weather": fetchCurrentWeather(userConfig["location"], userConfig["OPENWEATHERMAP_API_KEY"])
    };
};

// Main render function to draw up the widget.
export const render = ({output, error}) => {

    const {time, date, weather} = output;

    return (
        <div className={container}>
            
            <div className={flexContainer}>
                <div className={hours}>
                    {numberConverter.toWords(time["hours"])}
                </div>
                <div className={periodContainer}>
                    <div className={period}>{time["period"]}</div>
                </div>
            </div>
            
            <div className={minutes}>
                {numberConverter.toWords(time["minutes"]).replace("-", " ")}
            </div>

            <div className={infoBox}>
                <div className={weekday}>{date["weekday"]}</div>
                <div>{date["dateString"]}</div>
            </div>
    
            { weather === undefined ? 
                (<div className={infoBox}>Fetching weather...</div>) : 
                (<div className={infoBox}>
                    <div className={weatherBox}>
                        Weather in {weather["location"]} is {weather["condition"]}.
                        <br></br><br></br>
                        Current temprature is around {weather["temprature"]}°C, wind speed is {weather["windSpeed"]}km/h, and humidity about {weather["humidity"]}%
                    </div>
                </div>)
            }
        </div>
    );
};
