import React from 'react';
import './Login.css';
import SetupForm from './SetupForm';
import logo from './assets/logo.svg';
import backgroundImg from './assets/setupBG.svg';

function Login() {
  return (
    <div className="Login">
      <img src={logo} className="App-logo" alt="logo" />
      <SetupForm />
    </div>
  );
}

export default Login;
