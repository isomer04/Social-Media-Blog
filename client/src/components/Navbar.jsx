import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Navbar = () => {
  // Get the isLoggedIn status from the AuthContext
  const { isLoggedIn, logout, username } = useAuth(); 

  console.log('Navbar - isLoggedIn:', isLoggedIn);
  console.log('Navbar - username:', username);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white text-xl font-semibold">Social Media App</Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex">
            <div className="flex space-x-4">
              {/* Conditionally render "Register" and "Login" based on user login status */}
              {isLoggedIn ? (
                <>
                  <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Register</Link>
                  <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Login</Link>
                </>
              ) : (
                <>
                  {/* Render links for logged-in users */}
                  <Link to="/messages" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Post Message</Link>
                  <Link to="/messages/all" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">All Messages</Link>
                  <Link to={`/user/${username}`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">User Messages</Link>
                  <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">Logout</button>
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