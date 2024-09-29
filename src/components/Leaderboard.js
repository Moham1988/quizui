// Leaderboard.js
import React, { useEffect, useState } from 'react';


const Leaderboard = () => {
    const [topGames, setTopGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopGames = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await fetch('http://localhost:9090/api/v1/game');
                if (!response.ok) {
                    throw new Error('Failed to fetch games.');
                }
                const games = await response.json();

                // Sort games by highScore in descending order and get the top 5
                const sortedGames = games.sort((a, b) => b.highScore - a.highScore);
                const top5Games = sortedGames.slice(0, 5);
                setTopGames(top5Games);
            } catch (err) {
                setError(err.message); // Capture error
            } finally {
                setLoading(false);
            }
        };

        fetchTopGames();
    }, []);

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            {loading && <p>Loading leaderboard...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && topGames.length === 0 && <p>No games found.</p>}
            {!loading && !error && topGames.length > 0 && (
                <ul>
                    {topGames.map(game => (
                        <li key={game._id}>
                            <strong>{game.title}</strong>: {game.highScore}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Leaderboard;