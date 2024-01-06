import React, { useState } from 'react';

const GamersPortal: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Login
    try {

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return ("Invalid username or password. Please try again!");
      }

  //  redirect to the home page, if login was successful
      window.location.href = "/";
    } catch (error) {
      return '"Login failed. Please try again!", error)';
    }
  };

  return (
    <>
      <nav id="navbar">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="signup.html">Sign Up</a></li>
          <li><a href="login.html">Login</a></li>
        </ul>
      </nav>

      
    {/* adding my pre-loader JS file that I started off with initially */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="most-popular">
              <div className="row">
                <div className="col-lg-12">
                  <div className="heading-section">
                    <h4><em>Gamers</em>PORTAL</h4>
                  </div>
                  <form id="loginForm" onSubmit={handleLogin}>
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
                  <div className="row gameList">
                    {/* Game list content here */}
                  </div>
                  <div className="col-lg-12">
                    <div className="main-button hidden">
                      <a href="javascript:void(0)">Load More Games</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamersPortal;
