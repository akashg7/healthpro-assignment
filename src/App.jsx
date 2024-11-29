import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import IVFCalculator from './components/IVFCalculator';
import SuccessRate from './components/SuccessRate';

function App() {
  return (
    <Router>
      {/* Navbar will be visible on all pages */}
      <Navbar />
      
      <Routes>
        {/* Main route with IVF Calculator */}
        <Route path="/" element={<IVFCalculator />} />

        {/* Another route for Success Rate */}
        <Route path="/success-rate" element={<SuccessRate />} />
      </Routes>
    </Router>
  );
}

export default App;
