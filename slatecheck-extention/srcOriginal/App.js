/* global chrome */

import React from 'react';
import './App.css';
import Login from './components/Login';
import Checklist from './components/Checklist';
import Settings from './components/Settings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.settingsToggle = this.settingsToggle.bind(this);
    this.state = {
      isLoggedIn: false,
      isGuest: false,
      isSettings: false,
      account: ''
    };
    chrome.storage.sync.get(['data'], (result) => {
      this.setState({
        isLoggedIn: result.data.isLoggedIn,
        isGuest: result.data.isGuest,
        isSettings: result.data.isSettings,
        account: result.data.account
      });
    });
  }
  logout(){
    let stateTemp = {
      isLoggedIn: false,
      isGuest: false,
      isSettings: false,
      account: ''
    }
    this.setState({
      isLoggedIn: stateTemp.isLoggedIn,
      isGuest: stateTemp.isGuest,
      isSettings: stateTemp.isSettings,
      account: stateTemp.account
    });
    chrome.storage.sync.set({data: stateTemp}, () => {
      console.log("Logged Out");
    })
  }
  login(account) {
    let stateTemp = {
      isLoggedIn: true,
      isGuest: account.guest,
      isSettings: false,
      account: account
    }
    this.setState({
      isLoggedIn: stateTemp.isLoggedIn,
      isGuest: stateTemp.isGuest,
      isSettings: stateTemp.isSettings,
      account: stateTemp.account
    });
    chrome.storage.sync.set({data: stateTemp}, () => {
      console.log("Saved data to chrome");
    })
  }
  settingsToggle(){
    console.log(this.state);
    this.setState({
      isSettings: !this.state.isSettings
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isSettings = this.state.isSettings;
    const account = this.state.account;
    let view;
    if(!isLoggedIn) {
      view = <Login account={account} login={this.login}/>;
    }else{
      if(!isSettings){
        view = <Checklist account={account} title="Slate Check" settingsToggle={this.settingsToggle} />;
      }else{
        view = <Settings account={account} title="Settings" logout={this.logout} />;
      }
    }
    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
