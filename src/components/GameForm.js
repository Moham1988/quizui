import React, { useState } from 'react';

const GameForm = ({ onGameAdded }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [highScore, setHighScore] = useState(0);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Reset error state
        try {
            const response = await fetch('http://localhost:9090/api/v1/game/addGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, genre, highScore }),
            });

            if (!response.ok) {
                throw new Error('Failed to add the game.');
            }

            const newGame = await response.json();
            onGameAdded(newGame);
            setTitle('');
            setGenre('');
            setHighScore(0);
        } catch (err) {
            setError(err.message); // Capture error
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>High Score:</label>
                <input
                    type="number"
                    value={highScore}
                    onChange={(e) => setHighScore(Number(e.target.value))}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>Add Game</button>
            {loading && <p>Adding game...</p>} {/* Display loading while adding */}
            {error && <p>Error: {error}</p>} {/* Display error message */}
        </form>
    );
};

export default GameForm;