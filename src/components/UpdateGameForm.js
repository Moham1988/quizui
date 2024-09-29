import React, { useState } from 'react';

const UpdateGameForm = ({ game, setGames, cancelEdit }) => {
    const [title, setTitle] = useState(game.title);
    const [genre, setGenre] = useState(game.genre);
    const [highScore, setHighScore] = useState(game.highScore);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:9090/api/v1/game/updateGame/${game._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre, highScore }),
        })
            .then((response) => response.json())
            .then((updatedGame) => {
                // Update the game in the state
                setGames((prevGames) =>
                    prevGames.map((g) =>
                        g._id === game._id ? updatedGame : g
                    )
                );
                cancelEdit(); // Close the edit form
            });
    };

    return (
        <form onSubmit={handleUpdate}>
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
            <button type="submit">Update Game</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
    );
};

export default UpdateGameForm;