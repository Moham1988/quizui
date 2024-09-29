import React from 'react';
import Games from './components/Games';  // Import the main Games component
import './App.css';  // Optional: your main CSS file
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <div className="App">
      <h1>Game Management</h1>
      {/* Render the Games component, which handles adding, updating, deleting, and displaying games */}
      <Games />
      <Leaderboard /> {/* Include the Leaderboard here */}
    </div>
  );
};

export default App;