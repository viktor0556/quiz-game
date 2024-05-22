import React, { useState, useEffect } from 'react';
import '../Quiz.css';
import '../Quiz-animation.css';
import QuizSettings from './QuizSetting'

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [settings, setSettings] = useState(null);

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
      setTimeLeft(10);
    } else {
      alert(`Game over! Your score is ${score}`);
      resetQuiz();
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleAnswer(false);
    }
  }, [timeLeft, gameOver]);

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

  const startQuiz = ({ category, difficulty }) => {
    setSettings({ category, difficulty });
    setTimeLeft(10);
  };

  const resetQuiz = () => {
    setSettings(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  if (!settings) {
    return <QuizSettings onStart={startQuiz} />;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return <div>Your score is {score}</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return <div>Your score is {score}</div>;
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