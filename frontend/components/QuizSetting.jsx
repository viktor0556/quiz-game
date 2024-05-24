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
            <option value="Literature">Literature</option>
            <option value="Physics">Physics</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
      </div>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  )
}

export default QuizSetting;