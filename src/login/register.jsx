import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './regis.css';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/backend-php/register.php', {
        name,
        username,
        password
      });
      console.log(response);
      const result = response.data;

      if (result.status === 'success') {
        const successMessageDiv = document.getElementById('success-message');
        successMessageDiv.innerHTML = `<p class="success">${result.message}</p>`;
      } else {
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.innerHTML = `<p class="error">${result.message}</p>`;
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.innerHTML = '<p class="error">Terjadi kesalahan saat menghubungi server.</p>';
    }
  };

  return (
    <div className="container">
      <head>
        <link rel="shortcut icon" type="x-icon" href="../image/logo-1.png" />
        <title>JKT48 | Register</title>
      </head>

      <div className="logo">
        <center>
          <h1>JKT48</h1>
        </center>
        <span>Member's Information</span>
      </div>

      <div className="blur">
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        {/* Area Form */}
        <center>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Register</legend>
              <div id="success-message"></div>
              <div id="error-message"></div>
              <div className="login">
                <label htmlFor="nama">Name:</label>
                <br />
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="nama anda..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <label htmlFor="user">Username:</label>
                <br />
                <input
                  type="text"
                  id="user"
                  name="user"
                  placeholder="username anda..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />

                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password anda..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br /><br /><br />
                <button className="next" type="submit">Submit</button>
                <br /><br />
                <Link to="/" className="regis">Sudah punya akun?</Link>
              </div>
            </fieldset>
          </form>
        </center>
      </div>
    </div>
  );
}

export default Register;
