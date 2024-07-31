import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
