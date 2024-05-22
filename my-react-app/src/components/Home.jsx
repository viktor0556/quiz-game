import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Quiz Game</h1>
      <Link to="/quiz">Start Quiz</Link>
    </div>
  )
};

export default Home;