import React, { useState, useEffect } from 'react';
import GameForm from './GameForm';
import DeleteGameButton from './DeleteGameButton';
import UpdateGameForm from './UpdateGameForm';
import HighScoreDisplay from './HighScoreDisplay';

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGame, setSelectedGame] = useState(null);
    const [fetchError, setFetchError] = useState(null); // State for fetch error

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setFetchError(null); // Reset fetch error before fetching
            try {
                const response = await fetch('http://localhost:9090/api/v1/game');
                if (!response.ok) {
                    throw new Error('Failed to fetch games.');
                }
                const data = await response.json();
                setGames(data);
            } catch (err) {
                setFetchError(err.message); // Capture error
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleGameAdded = async (newGame) => {
        setLoading(true); // Set loading state
        try {
            // Assuming there's a POST endpoint to add a game
            const response = await fetch('http://localhost:9090/api/v1/game/addGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (!response.ok) {
                throw new Error('Failed to add the game.');
            }

            const addedGame = await response.json();
            setGames([...games, addedGame]);
        } catch (err) {
            setError(err.message); // Capture error
        } finally {
            setLoading(false);
        }
    };

    const handleGameUpdated = async (updatedGame) => {
        setLoading(true); // Set loading state
        try {
            // Assuming there's a PUT endpoint to update a game
            const response = await fetch(`http://localhost:9090/api/v1/game/updateGame/${updatedGame._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGame),
            });

            if (!response.ok) {
                throw new Error('Failed to update the game.');
            }

            const updatedGameData = await response.json();
            setGames(games.map(game => (game._id === updatedGameData._id ? updatedGameData : game)));
        } catch (err) {
            setError(err.message); // Capture error
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTitleClick = (game) => {
        setSelectedGame(game);
    };

    const handleClose = () => {
        setSelectedGame(null);
    };

    // Filter games based on search term
    const filteredGames = games.filter(game =>
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Game List</h1>
            <GameForm onGameAdded={handleGameAdded} />
            <input
                type="text"
                placeholder="Search by genre"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    padding: '10px',
                    margin: '20px 0',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    width: '100%',
                }}
            />
            {loading && <p>Loading...</p>}
            {fetchError && <p>Error: {fetchError}</p>} {/* Display fetch error */}
            {error && <p>Error: {error}</p>} {/* Display error for adding/updating */}
            {!loading && !fetchError && !error && (
                <ul>
                    {filteredGames.map(game => (
                        <li key={game._id}>
                            <span
                                style={{ cursor: 'pointer', color: '#007BFF' }}
                                onClick={() => handleTitleClick(game)}
                            >
                                {game.title}
                            </span>
                            - {game.genre} - High Score: {game.highScore}
                            <DeleteGameButton gameId={game._id} games={games} setGames={setGames} />
                            <UpdateGameForm game={game} onGameUpdated={handleGameUpdated} />
                        </li>
                    ))}
                </ul>
            )}
            {selectedGame && (
                <HighScoreDisplay
                    title={selectedGame.title}
                    highScore={selectedGame.highScore}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Games;