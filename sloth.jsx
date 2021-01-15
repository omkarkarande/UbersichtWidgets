/* eslint-disable react/react-in-jsx-scope */
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime, fetchGreeting } from './src/datetimeutils';
import { fetchCurrentWeather } from './src/weatherutils';

// User Config
const userConfig = require("./user_config.json");

// CSS
const container = css`
    display: flex;
    color: #eee;
    margin-top: 10vh;
`;

const h1 = css`
    font-family: "Galyon Bold";
    font-size: 72px;
    text-transform: uppercase;
`;

const h1Light = css`
    font-family: "Galyon";
    font-size: 72px;
    text-transform: uppercase;
    color: #888;
`;

const greeting = css`
    padding: 120px 12px 0 5px;
    font-family: "Galyon";
    font-size: 18px;
    letter-spacing: 0.4em;
    writing-mode: vertical-lr;
    text-transform: uppercase;
    text-orientation: sideways;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
`;

const info = css`
    flex-grow: 1;
    padding-left: 15px;
    border-left: 2px solid #eee;
    height: 100vh;
`;

const dateBox = css`
    line-height: 4em;
`;

const timeBox = css`
    padding-top: 32px;
    font-family: "Galyon Bold";
    font-size: 42px;
`;

const weatherBox = css`
    width: 400px;
    padding-top: 32px;
    font-family: "Avenir";
    letter-spacing: 0.1em;
    font-size: 14px;
    text-transform: uppercase;
`;

export const refreshFrequency = 15000;

export const command = () => {
    // Fetch time information.
    return {
        time: fetchCurrentTime(),
        date: fetchCurrentDate(),
        weather: fetchCurrentWeather(userConfig["location"], userConfig["openweathermapApiKey"]),
    };
};

export const render = ({ output, error }) => {

    const {time, date, weather} = output;
    console.log(weather);
    return (
        <div className={container}>
            <div className={greeting}>
                good {fetchGreeting(time["hours"])}
            </div>

            <div className={info}>
                <div className={dateBox}>
                    <div className={h1}>hello, </div>
                    <div className={h1Light}>{userConfig["user"]}</div>
                    <div className={h1}>{`it's ${date["weekday"]}`}</div>
                    <div className={h1}>{date["day"]}.{date["month"]} <span className={h1Light}>{date["year"]}</span></div>
                </div>

                <div className={timeBox}>
                    {time["hours"]}.{time["minutes"]} {time["period"]}
                </div>

                { weather === undefined ? 
                    (
                        <div className={weatherBox}>Fetching Weather...</div>
                    ) : 
                    (
                        <div className={weatherBox}>
                            {`${weather["condition"]} outside, with a temprature of ${weather["temprature"]}°C. humidity is at ${weather["humidity"]}% and wind is blowing at ${weather["windSpeed"]} km/h`}
                        </div>
                    )
                }
            </div>
        </div>
    );
};
