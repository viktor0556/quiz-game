import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home-page.css'

const Home = () => {
  return (
    <div className='home-container'>
      <h1 className='quiz-home'>Welcome to the Quiz Game</h1>
      <Link className='quiz-link' to="/quiz">Start Quiz</Link>
    </div>
  )
};

export default Home;