import React, {useState} from 'react';

const QuizSetting = ({ onStart }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleStart = () => {
    onStart({ category, difficulty });
  };

  return (
    <div>
      <h2>Quiz Settings</h2>
      <div>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Any</option>
            <option value="Math">Mathematica</option>
            <option value="Geography">Geography</option>
            <option value="General Knowledge">General Knowledge</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  )
}

export default QuizSetting;