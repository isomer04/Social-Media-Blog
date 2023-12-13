import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic for successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for logout
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white text-xl font-semibold">Social Media App</Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex">
            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Render links for logged-in users */}
                  <Link to="/messages" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Post Message</Link>
                  <Link to="/messages/all" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">All Messages</Link>
                  <Link to="/messages/user" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">User Messages</Link>
                  {/* Add a logout button */}
                  <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  {/* Render "Register" and "Login" links for not logged-in users */}
                  <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Register</Link>
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
