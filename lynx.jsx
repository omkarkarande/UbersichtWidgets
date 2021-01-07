// Imports 
import { css } from 'uebersicht'

// 3P requires
var converter = require("number-to-words")

// Emotion styles
const container = css`
    padding: 14vh 0 0 20px;
`;

const flexContainer = css`
    display: flex;
`;

const hours = css`
    color: #191919;
    font-family: "Roboto Black";
    font-size: 72px;
    text-transform: uppercase;
`;

const minutes = css`
    color: #333;
    font-family: "Roboto Light";
    font-size: 80px;
    text-transform: uppercase;
`;

const period = css`
    color: #333;
    background-color: #aaa;
    font-family: "Roboto";
    font-size: 24px;
`;

// Helper Methods:

const fetchCurrentTimeInWords = () => {
    var now = new Date();
    return {
        "hours": converter.toWords(now.getHours() % 12 || 12),
        "minutes": converter.toWords(now.getMinutes()).replace("-", " "), // Quirk of the converter, adds a hyphen for multi word numbers, fifty-five etc.
    }
}


// Value in milliseconds. Dictates how often the widget state is refreshed.
export const refreshFrequency = 15000;

// Command to be executed at every {refreshInterval}.
export const command = () => {
    return {
        "time": fetchCurrentTimeInWords()
    }
}

// Main render function to draw up the widget.
export const render = ({output, error}) => {
    return (
        <div className={container}>
            <div>
                <span className={hours}>{output["time"]["hours"]}</span>
            </div>
            <span className={minutes}>{output["time"]["minutes"]}</span>
        </div>
    )
}
