import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './App';
import UserProfile from './user';
import Feni from '../assets/inti/feni_fitriyanti.jpg';
import Christy from '../assets/inti/angelina_christy.jpg';
import Gracie from '../assets/inti/grace_octaviani.jpg';
import Ella from '../assets/inti/gabriela_abigail.jpg';
import AKB from '../assets/48G_logo/akb48.png';
import BNK from '../assets/48G_logo/bnk48.png';
import MNL from '../assets/48G_logo/mnl48.png';
import KLP from '../assets/48G_logo/klp48.png';
import './menu.css';

function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeVid, setActiveVid] = useState(1);
  let navigate = useNavigate();

  useEffect(() => {
    // Cek status login saat komponen dimuat
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('username');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setUsername(userName);
    } else {
      alert('You are not logged in!');
      navigate('/');
    }

    // Event listener untuk sticky header
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 0) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fungsi untuk memilih video yang ditampilkan
  const handleVideoChange = (vidNumber) => {
    setActiveVid(vidNumber);
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.clear();
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">
            {/* Navigation bar */}
            <div className="navbar">
              <div className="header">
                <div className="logo">
                  <a href="#">
                    <center><h1 className="logo2">JKT48</h1></center>
                  </a>
                </div>
                <header>
                  <center>
                    <div className="section-part">
                      <ul>
                        <li><a href="#member-list">Member</a></li>
                        <li><a href="#video">Video</a></li>
                        <li><a href="#gruplain">48Group</a></li>
                      </ul>
                    </div>
                  </center>
                </header>
                <div className="user">
                  <a href="" onClick={handleLogout}>
                    <p id="logoutButton">Sign Out</p>
                  </a>
                  <p>|</p>
                  <Link to="/user">
                    <p id="welcomeText">Halo, {username}</p>
                  </Link>
                </div>
              </div>
            </div>

            <section id="member-list">
              <div className="bag-kiri">
                {/* News Section */}
                <div className="new">
                  <div className="news">
                    <div className="news2">
                      <h1>News</h1>
                      <center>
                        <ul>
                          <li><button>Pengumuman Mengenai Graduation Reva Fidela</button></li>
                          <li><button>Pengumuman Mengenai Prosesi Pelepasan Kabesha Reva Fidela</button></li>
                          <li><button>Pengumuman Mengenai Pertunjukan Theater Kelulusan Reva Fidela</button></li>
                          <li><button className="more" onClick={() => window.location.href='https://jkt48.com/news/list?lang=id'}>More News</button></li>
                        </ul>
                      </center>
                      <br /><br /><br />
                      <h1>Other</h1>
                      <center>
                        <ul>
                          <li><button onClick={() => window.location.href='../single/index.html'}>List Single JKT48</button></li>
                        </ul>
                        <iframe src="https://youtube.com/embed/tWhREjQ27r4?si=yEkCr8DlztT8siNA" autoPlay title="News Video"></iframe>
                      </center>
                    </div>
                  </div>
                </div>

                {/* Registration Section */}
                <div className="daftar">
                  <div className="daftarin">
                    <div className="daftarin2">
                      <h1>Pendaftaran Member</h1>
                      <br /><br />
                      <center>
                        <button onClick={() => window.location.href='../daftar/index.php'}>Link pendaftaran JKT48 Generasi 48</button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div className="member">
                <div className="allmember">
                  <div className="membert1-all">
                    <div className="membert1-text">
                      <center><h1>Member Tahap 1</h1></center>
                    </div>
                    <div className="memberinti">
                      <a href="../member/feni/index.html" className="feni">
                        <img src={Feni} alt="Feni Fitriyanti" />
                        <p>Feni Fitriyanti</p>
                      </a>
                      <a href="../member/christy/index.html" className="christy">
                        <img src={Christy} alt="Angelina Christy" />
                        <p>Angelina Christy</p>
                      </a>
                    </div>
                  </div>

                  <div className="membert2-all">
                    <div className="membert2-text">
                      <center><h1>Member Tahap 2</h1></center>
                    </div>
                    <div className="membert2">
                      <a href="../member/gracie/index.html" className="gracie">
                        <img src={Gracie} alt="Gracie Octaviani" />
                        <p>Gracie Octaviani</p>
                      </a>
                      <a href="../member/ella/index.html" className="ella">
                        <img src={Ella} alt="Gabriella Abigail" />
                        <p>Gabriella Abigail</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div id="video">
              <div className="atas-video">
                <center>
                  <h1>Another Video</h1>
                </center>
              </div>
              <br /><br />
              <center>
                <div className="video-1" style={{ display: activeVid === 1 ? 'block' : 'none' }}>
                  <iframe src="https://youtube.com/embed/OGRz3xaYFBA?si=XVT0RolpE3eUXOrm" id="vid-1"></iframe>
                </div>
                <div className="video-2" style={{ display: activeVid === 2 ? 'block' : 'none' }}>
                  <iframe src="https://youtube.com/embed/unZzBUREzNU?si=W6e48lobqv0RF-Qb" id="vid-2"></iframe>
                </div>
                <div className="video-3" style={{ display: activeVid === 3 ? 'block' : 'none' }}>
                  <iframe src="https://youtube.com/embed/lhciWZMnnTc?si=YDI-LQqrmEcrdhEb" id="vid-3"></iframe>
                </div>
                <br />
                <div className="button-video">
                  <center>
                  <ul>
                    <li><button onClick={() => handleVideoChange(1)}>.</button></li>
                    <li><button onClick={() => handleVideoChange(2)}>.</button></li>
                    <li><button onClick={() => handleVideoChange(3)}>.</button></li>
                  </ul>
                  </center>
                </div>
              </center>
            </div>

            <div id="gruplain">
              <div className="grup48">
                <center>
                  <h1>48 Group</h1>
                  <a href=""><img src={AKB} alt="AKB48" /></a>
                  <a href=""><img src={BNK} alt="BNK48" /></a>
                  <a href=""><img src={MNL} alt="MNL48" /></a>
                  <a href=""><img src={KLP} alt="KLP48" /></a>
                </center>
              </div>
            </div>
          </div>
        }
        />
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserProfile />} />
    </Routes>
  );
}

export default Menu;
