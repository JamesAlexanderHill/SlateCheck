import React from 'react';
import './SetupForm.css';

class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      secret: '',
    };

    this.idChange = this.idChange.bind(this);
    this.secretChange = this.secretChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  idChange(event) {
    this.setState({id: event.target.value});
  }
  secretChange(event) {
    this.setState({secret: event.target.value});
  }
  handleSubmit(event) {
    let userObj = {
      guest: false,
      user: {
        id: this.state.id,
        secret: this.state.secret
      }
    };
    this.props.onLoginSubmit(userObj);
    event.preventDefault();
  }
  handleGuest(event) {
    let userObj = {
      guest: true,
      user: {
        id: '',
        secret: ''
      }
    };
    this.props.onLoginSubmit(userObj);
    event.preventDefault();
  }

  render() {
    const account = this.props.account;
    const errors = this.props.errors;
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        <input type="text" placeholder="Client ID" value={this.props.account.id} onChange={this.idChange} /><br />
        <input type="text" placeholder="Client Secret" value={this.props.account.secret} onChange={this.secretChange} /><br />
        <p className="errors">{errors}</p>
        <input type="submit" value="Confirm" /><br />
        <a href="#" onClick={this.handleGuest}>Continue as Guest</a>
      </form>
    );
  }
}

export default SetupForm;
