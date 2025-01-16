import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './register';
import Menu from './menu';
import UserProfile from './user';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/backend-php/login.php', { name, pass });
      console.log(response);
      const result = response.data;

      if (result.status === 'success') {
        // Save data to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', result.username);
        localStorage.setItem('user_name', result.accName);
        localStorage.setItem('id', result.id);

        navigate('/menu');
      } else {
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.innerHTML = `<p class="error">${result.message}</p>`;
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.innerHTML = '<p class="error">Terjadi kesalahan saat menghubungi server.</p>';
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">
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
                <form id="loginForm" onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>Login</legend>
                    <div className="login">
                      <div id="error-message"></div>
                      <label htmlFor="user">Username:</label>
                      <br />
                      <input
                        type="text"
                        id="user"
                        name="user"
                        placeholder="username anda..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <br /><br />
                      <label htmlFor="password">Password:</label>
                      <br />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password anda..."
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <br /><br /><br /><br />
                      <button className="next" type="submit">Submit</button>
                      <br /><br />
                      <Link to="/register" className="regis">
                        Tidak punya akun?
                      </Link>
                    </div>
                  </fieldset>
                </form>
              </center>
            </div>
          </div>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/user" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
