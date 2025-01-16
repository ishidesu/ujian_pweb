import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './App';
import './user.css';

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [isUpdating, setIsUpdating] = useState(false); // State to control form visibility
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    // Mendapatkan data dari localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    const storedUserName = localStorage.getItem('user_name');
    const storedId = localStorage.getItem('id');

    if (loggedIn) {
      setIsLoggedIn(true);
      setName(storedUsername);
      setUsername(storedUserName);
      setMemberNumber(storedId);
      setNewName(storedUsername); // Set initial new name to the stored username
      setNewUsername(storedUserName); // Set initial new username to the stored username
    } else {
      alert('You are not logged in!');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    alert('You have been logged out.');
    navigate('/');
  };

  const deleteUser = async () => {
    const userId = localStorage.getItem('id');
    if (userId) {
      const confirmDelete = window.confirm('Are you sure you want to delete this account?');
      if (confirmDelete) {
        try {
          const response = await fetch('http://localhost/backend-php/delete.php', {
            method: 'POST', // Menggunakan POST untuk keamanan
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Tipe data yang dikirimkan
            },
            body: `id=${encodeURIComponent(userId)}`, // Mengirimkan ID pengguna
          });

          const data = await response.text(); // Menerima respons sebagai teks
          if (data.includes('Data berhasil dihapus')) {
            alert('Account successfully deleted');
            localStorage.clear(); // Menghapus data login setelah penghapusan akun
            navigate('/'); // Mengarahkan ke halaman login
          } else {
            alert('Failed to delete account');
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          alert('An error occurred. Please try again later.');
        }
      }
    } else {
      alert('User ID not found.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('id');
    if (userId) {
      try {
        const response = await fetch('http://localhost/backend-php/update.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `id=${encodeURIComponent(userId)}&nama=${encodeURIComponent(newName)}&user_name=${encodeURIComponent(newUsername)}`,
        });

        const data = await response.json();
        if (data.message) {
          alert(data.message);
          setIsUpdating(false); // Hide the update form
          setName(newName); // Update the displayed name
          setUsername(newUsername); // Update the displayed username
        } else {
          alert(data.error || 'Failed to update user.');
        }
      } catch (error) {
        console.error('Error updating account:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('User ID not found.');
    }
  };

  return (
    <div className="container">
      {/* Navigation bar */}
      <div className="navbar">
        <div className="header">
          <div className="logo">
            <a href="../menu/">
              <center>
                <h1 className="logo2">JKT48</h1>
              </center>
            </a>
          </div>
          <div className="user">
            <a href="#" onClick={handleLogout}>
              <p id="logoutButton">Sign Out</p>
            </a>
            <p>|</p>
            <a href="../user/">
              <p id="welcomeText">Halo, {name}</p>
            </a>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <section id="userProfile">
        <div className="bag-kiri">
          {/* News Section */}
          <div className="new">
            <div className="news">
              <div className="news2">
                <h1>News</h1>
                <center>
                  <ul>
                    <li>
                      <button>Pengumuman Mengenai Graduation Reva Fidela</button>
                    </li>
                    <li>
                      <button>Pengumuman Mengenai Prosesi Pelepasan Kabesha Reva Fidela</button>
                    </li>
                    <li>
                      <button>Pengumuman Mengenai Pertunjukan Theater Kelulusan Reva Fidela</button>
                    </li>
                    <li>
                      <button
                        className="more"
                        onClick={() => (window.location.href = 'https://jkt48.com/news/list?lang=id')}
                      >
                        More News
                      </button>
                    </li>
                  </ul>
                </center>
                <br />
                <br />
                <br />
                <h1>Other</h1>
                <center>
                  <ul>
                    <li>
                      <button onClick={() => (window.location.href = '../single/index.html')}>
                        List Single JKT48
                      </button>
                    </li>
                  </ul>
                  <iframe
                    src="https://youtube.com/embed/tWhREjQ27r4?si=yEkCr8DlztT8siNA"
                    autoPlay
                    title="News Video"
                  ></iframe>
                </center>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Details */}
        <div className="uProfile">
          {!isUpdating ? (
            <>
              <p id="nama">Nama: {name}</p>
              <p id="acc-uName">Account Username: {username}</p>
              <p id="noAnggota">Nomor Anggota: {memberNumber}</p>
              <br />
              <br />
              <br />
              <br />
              <a href="#" className="edit" onClick={() => setIsUpdating(true)}>
                Ubah Profile
              </a>
              <br />
              <br />
              <a href="#" className="delete" onClick={deleteUser}>
                Hapus Akun
              </a>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor="newName">Nama:</label>
              <input
                type="text"
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              <label htmlFor="newUsername">Username:</label>
              <input
                type="text"
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setIsUpdating(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
