import React from 'react';
import './App.css';
import Login from './components/Login';
import Checklist from './components/Checklist';
import Settings from './components/Settings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSettings: false
    };
  }

  login() {
    if(true){
      this.setState(state => ({
        isLoggedIn: true
      }));
    }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isSettings = this.state.isSettings;
    let view;
    if(!isLoggedIn) {
      view = <Login />;
    }else{
      if(!isSettings){
        view = <Checklist />;
      }else{
        view = <Settings />;
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
