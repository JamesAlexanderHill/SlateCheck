import React from 'react';
import './SetupForm.css';

class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      secret: ''
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
    console.log(this.state.id + ", " + this.state.secret);
    event.preventDefault();
  }
  handleGuest(event) {
    console.log("guest");
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Client ID" value={this.state.value} onChange={this.idChange} /><br />
        <input type="text" placeholder="Client Secret" value={this.state.value} onChange={this.secretChange} /><br />
        <input type="submit" value="Confirm" /><br />
        <a href="#" onClick={this.handleGuest}>Continue as Guest</a>
      </form>
    );
  }
}

export default SetupForm;
