// LoginForm.js
import  { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle success, store user token, redirect, etc.
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
