/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import "./API/api.js";
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import PostList from './components/PostList.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <>
      <div id="container">
        <div className='navbar'>
            <h1 className="nav-title">Strangers Things</h1>
            <div className='header-links'>
              <Link className='link' to="/">Posts</Link>
              {token && ( <Link className='link' to="/profile">Profile</Link> )}
              <Link className='link' to="/login">{token ? "Log Out" : "Log In"}</Link>
              <Link className='link' to="/signup">Sign Up</Link>
            </div>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<PostList token={token} /> } />
            { token && ( <Route path="/profile" element={<Profile token={token} />} /> )}
            <Route path="/login" 
              element={
                <LoginForm 
                  token={token} 
                  setToken={setToken} 
                  username={username} 
                  setUsername={setUsername}
                />
              } 
            />
            <Route path="/signup" element={<SignUp setToken={setToken} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
