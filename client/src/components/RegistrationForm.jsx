// RegistrationForm.js
import  { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', {
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      // Handle success, redirect, etc.
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationForm;
