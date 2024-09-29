import React, { useState } from 'react';
import DeleteGameButton from './DeleteGameButton';
import UpdateGameForm from './UpdateGameForm';

const GameList = ({ games, setGames, loading, error }) => {
    const [editingGameId, setEditingGameId] = useState(null); // Tracks which game is being edited

    // Function to handle editing a game
    const handleEditGame = (gameId) => {
        setEditingGameId(gameId);
    };

    // Function to cancel editing
    const handleCancelEdit = () => {
        setEditingGameId(null);
    };

    return (
        <div>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {!loading && !error && (
                <ul className="game-list">
                    {games.map((game) => (
                        <li key={game._id} className="game-item">
                            {editingGameId === game._id ? (
                                <UpdateGameForm
                                    game={game}
                                    setGames={setGames}
                                    cancelEdit={handleCancelEdit}
                                />
                            ) : (
                                <>
                                    <span>{game.title} - {game.genre} - High Score: {game.highScore}</span>
                                    <button className="edit-button" onClick={() => handleEditGame(game._id)}>Edit</button>
                                    <DeleteGameButton
                                        gameId={game._id}
                                        games={games}
                                        setGames={setGames}
                                    />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GameList;