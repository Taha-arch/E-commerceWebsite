import React from 'react';
import './styles/index.css';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (

      <Router>
      <Routes>
        <Route path='/Home' element={<LandingPage />}></Route>
    </Routes>
    </Router>
  );
}

export default App;
