import {  Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import UserMessages from "./components/UserMessages";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/user/:username" element={<Homepage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/messages" element={<MessageForm />} />
            <Route path="/allmessages" element={<MessageList />} />
            <Route path="/messages/user" element={<UserMessages />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </Router>
    </AuthProvider>
      
  );
}

export default App;
