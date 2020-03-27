import React from 'react';
import './Settings.css';
import Checklist_header from './Checklist_header';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    this.props.logout();
  }
  render() {
    return (
      <div className="Settings">
        <Checklist_header title={this.props.title} user={this.props.account.username}/>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Settings;
