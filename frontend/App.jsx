import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import BackgroundMusic from './audio/bg-music';

function App() {

  return (
    <>
    <span className='beta-label'>Beta</span>
    <Router>
      <BackgroundMusic />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quiz' element={<Quiz />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
