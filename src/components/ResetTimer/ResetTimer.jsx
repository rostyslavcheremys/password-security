import CircularProgress from "@mui/material/CircularProgress";

import { formatTime } from "../../utils/formatTime.js";

import "./ResetTimer.css";

export const ResetTimer = ({ progress, seconds}) => {
    return (
        <div className="reset-timer">
            <div className="reset-timer__container">
                <CircularProgress
                    className="reset-timer__progress"
                    variant="determinate"
                    value={progress}
                />

                <div className="reset-timer__time">
                    <span className="reset-timer__time-label">{formatTime(seconds)}</span>
                </div>
            </div>

            <label className="reset-timer__label">Access blocked. Please wait...</label>
        </div>
    );
};