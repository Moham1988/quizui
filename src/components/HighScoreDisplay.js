// HighScoreDisplay.js
import React from 'react';

const HighScoreDisplay = ({ title, highScore, onClose }) => {
    return (
        <div className="high-score-display">
            <h2>{title}</h2>
            <p>High Score: {highScore}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default HighScoreDisplay;