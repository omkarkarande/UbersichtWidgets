/* eslint-disable react/react-in-jsx-scope */

// Imports 
import { css } from 'uebersicht';
import { fetchCurrentDate, fetchCurrentTime } from './src/datetimeutils';

// 3P requires
var numberConverter = require("number-to-words");

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
    margin: 10px 0 0 4px;
    padding-left: 10px;
    font-family: "Roboto";
    border-left: 4px solid #191919;
`;

const weekday = css`
    padding-bottom: 4px;
    font-size: 20px;
    font-family: "Roboto Bold";
    text-transform: uppercase;
`;

const weather = css`
    width: 500px;
    overflow-wrap: normal;
`;

// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 15000;

// Command to be executed at every {refreshInterval}.
export const command = () => {
    return {
        "time": fetchCurrentTime(),
        "date": fetchCurrentDate(),
    };
};

// Main render function to draw up the widget.
export const render = ({output, error}) => {
    return (
        <div className={container}>
            
            <div className={flexContainer}>
                <div className={hours}>
                    {numberConverter.toWords(output["time"]["hours"])}
                </div>
                <div className={periodContainer}>
                    <div className={period}>{output["time"]["period"]}</div>
                </div>
            </div>
            
            <div className={minutes}>
                {numberConverter.toWords(output["time"]["minutes"]).replace("-", " ")}
            </div>

            <div className={infoBox}>
                <div className={weekday}>{output["date"]["weekday"]}</div>
                <div>{output["date"]["dateString"]}</div>
            </div>
        </div>
    );
};
