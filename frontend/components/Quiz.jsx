import React, { useState, useEffect } from "react";
import "../styles/Quiz.css";
import "../styles/Quiz-animation.css";
import QuizSettings from "./QuizSetting";
import clickSound from "../assets/click.mp3";
import rightSound from "../assets/goodAnswer.mp3";
import wrongSound from "../assets/errorAnswer.mp3";
import useSound from "use-sound";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [settings, setSettings] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false)

  const [playClick] = useSound(clickSound, { volume: 0.3 });
  const [playClickGoodAnswer] = useSound(rightSound, { volume: 0.3 });
  const [playClickBadAnswer] = useSound(wrongSound, { volume: 0.15});

  const startQuiz = ({ category, difficulty }) => {
    setSettings({ category, difficulty });
    setShowGameOver(false);
    setIsQuizActive(true);
    playClick();
  };

  useEffect(() => {
    if (settings) {
      fetchQuestions(settings.category, settings.difficulty);
    }
  }, [settings]);

  

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      playClickGoodAnswer();
    } else {
      playClickBadAnswer();
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeLeft(
        getTimeForDifficulty(questions[nextQuestionIndex].difficulty)
      );
    } else if (currentQuestionIndex < questions.length) {
      setShowGameOver(true);
      setIsQuizActive(false)
      playClick();
    }
  };

  useEffect(() => {
    if (isQuizActive && timeLeft > 0 && !showGameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showGameOver) {
      handleAnswer(false);
    }
  }, [timeLeft, showGameOver]);

  const fetchQuestions = (category, difficulty) => {
    let url = "http://localhost:8080/api/questions";
    const params = new URLSearchParams();
    if (category) {
      params.append("category", category);
    }
    if (difficulty) {
      params.append("difficulty", difficulty);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        if (data.length > 0) {
          setTimeLeft(getTimeForDifficulty(data[0].difficulty));
        }
      })
      .catch(error => console.error("Error fetching questions:", error));
  };

  const getTimeForDifficulty = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return 5;
      case "Medium":
        return 10;
      case "Hard":
        return 15;
    }
  };

  const resetQuiz = () => {
    setSettings(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizActive(false)
    playClick();
  };

  if (!settings) {
    return <QuizSettings onStart={startQuiz} />;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showGameOver) {
    return (
      <div className="game-over">
        <h2>Game Over! Your score is {score}</h2>
        <button onClick={resetQuiz}>Start New Game</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h2 className="question">{currentQuestion.question}</h2>
      <div className="time-left">Time left: {timeLeft} seconds</div>
      {currentQuestion.answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
          {answer.text}
        </button>
      ))}
      <h1>Current score: {score}</h1>
    </div>
  );
};

export default Quiz;
