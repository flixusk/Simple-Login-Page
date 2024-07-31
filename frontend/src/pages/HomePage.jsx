import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      // Log out the user
      localStorage.removeItem('auth-token');
      setIsLoggedIn(false);
      navigate('/'); // Redirect to homepage
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="bg-stone-900 text-white flex flex-col items-center justify-center min-h-screen overflow-auto">
      <h1 className="text-5xl font-bold mb-6">Welcome to a Simple Login Web App</h1>
      <button
        onClick={handleButtonClick}
        className={`px-6 py-3 rounded-full text-lg font-semibold transition duration-300 ${
          isLoggedIn
            ? 'bg-red-500 text-white hover:bg-red-700'
            : 'bg-white text-stone-900 hover:bg-cyan-100'
        }`}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default HomePage;
