import React from 'react';

const DeleteGameButton = ({ gameId, games, setGames }) => {
    const handleDelete = () => {
        fetch(`http://localhost:9090/api/v1/game/deleteGame/${gameId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                // Update the game list by removing the deleted game
                setGames(games.filter(game => game._id !== gameId));
            })
            .catch((error) => {
                console.error('Error deleting game:', error);
            });
    };

    return (
        <button className="delete-button" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteGameButton;