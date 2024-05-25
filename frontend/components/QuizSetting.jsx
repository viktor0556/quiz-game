import React, {useState} from 'react';
import '../styles/quiz-settings.css'

const QuizSetting = ({ onStart }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleStart = () => {
    onStart({ category, difficulty });
  };

  return (
    <div className='settings-container'>
      <h2 className='title'>Quiz Settings</h2>
      <div>
        <label>
          Category:
          <select className='category-select' value={category} onChange={(e) => setCategory(e.target.value)}>
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
          <select className='difficulty-select' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any</option>
            <option value="Easy">Easy (5 sec)</option>
            <option value="Medium">Medium (10 sec)</option>
            <option value="Hard">Hard (15 sec)</option>
          </select>
        </label>
      </div>
      <button className='start-button' onClick={handleStart}>Start Quiz</button>
    </div>
  )
}

export default QuizSetting;