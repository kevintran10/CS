import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      
      const response = await fetch('/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        
        return 'Sorry there was an error, please try again!';
        
      }

// Redirect Home
    window.location.href = '/'; 
  } catch (error) {
    console.error('Sorry there was an error with this login, please try again!:', error);
  }
};

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          placeholder="Enter Username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Enter Password"
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="signup.html">Sign up here</a></p>
    </div>
  );
};

export default Login;
