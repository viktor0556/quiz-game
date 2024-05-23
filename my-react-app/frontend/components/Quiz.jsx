import React, { useState, useEffect } from 'react';
import '../Quiz.css';
import '../Quiz-animation.css';
import QuizSettings from './QuizSetting'

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [settings, setSettings] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);

  const startQuiz = ({ category, difficulty }) => {
    setSettings({ category, difficulty });
    setTimeLeft(5);
    setShowGameOver(false);
  };

  useEffect(() => {
    if (settings) {
      fetchQuestions(settings.category, settings.difficulty);
    }
  }, [settings]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeLeft(5);
    } else if (currentQuestionIndex < questions.length) {
      setShowGameOver(true)
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !showGameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showGameOver) {
      handleAnswer(false);
    }
  }, [timeLeft, showGameOver]);

  const fetchQuestions = (category, difficulty) => {
    let url = 'http://localhost:8080/api/questions';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (difficulty) params.append('difficulty', difficulty);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setCurrentQuestionIndex(0);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const resetQuiz = () => {
    setSettings(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (!settings) {
    return <QuizSettings onStart={startQuiz} />;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showGameOver) {
    return (
      <div className='game-over'>
        <h2>Game Over! Your score is {score}</h2>
        <button onClick={resetQuiz}>Start New Game</button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='container'>
      <h2 className='question'>{currentQuestion.question}</h2>
      <div className='time-left'>Time left: {timeLeft} seconds</div>
      {currentQuestion.answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
          {answer.text}
        </button>
      ))}
      <h2>Your Score: {score}</h2>
    </div>
  );
};

export default Quiz;