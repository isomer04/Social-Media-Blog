import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

const Navbar = () => {
  const { isLoggedIn, logout, username } = useAuth();
  const { username: routeUsername } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false); // Set loading to false once the authentication state is available
  }, [isLoggedIn, username]);

  const displayUsername = username || routeUsername;

  console.log(" displayUsername " + displayUsername);

  const handleLogout = () => {
    try {
      console.log("Logging out...");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to={isLoggedIn ? `/user/${username}` : "/"}
              className="text-white text-xl font-semibold"
            >
              Social Media App
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex">
            <div className="flex space-x-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {isLoggedIn ? (
                    <>
                      {/* Render links for logged-in users */}
                      <Link
                        to="/messages"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Post Message
                      </Link>
                      <Link
                        to="/allmessages"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        All Messages
                      </Link>
                      {/* <Link to={`/user/${username}`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">User Messages</Link> */}
                      <Link
                        to={`/user/${username}`}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Your Messages
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Login
                      </Link>
                    </>
                  )}
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
