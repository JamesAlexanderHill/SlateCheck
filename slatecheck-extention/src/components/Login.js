import React from 'react';
import './Login.css';
import SetupForm from './SetupForm';
import logo from './assets/logo.svg';
import backgroundImg from './assets/setupBG.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handlelogin = this.handlelogin.bind(this);
    this.state = {
      errors: ''
    };
  }
  handlelogin(account) {
    let error = '';
    if(account.guest == true){
      //set name to guest
      account.username = "Guest";
    }else{
      //get user data from server
      account.username = "Username";
    }
    this.props.login(account);
    this.setState({errors: error});
  }
  render() {
    const account = this.props.account;
    const errors = this.state.errors;
    return (
      <div className="Login">
        <img src={logo} className="App-logo" alt="logo" />
        <SetupForm
          account={account}
          onLoginSubmit={this.handlelogin}
          error={errors}
        />
      </div>
    );
  }
}

export default Login;
