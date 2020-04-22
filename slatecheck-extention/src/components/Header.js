//import assets
import React from 'react';
import './Header.css';

class Header extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
    };
    //bind functions

  }

  //functions

  //handlers

  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("Header Render: ", this.state);
    }
    /*variables*/

    /*views*/

    return (
      <header>
        <h1>{this.props.title}</h1>
        <p class="account-label">{this.props.username}</p>
      </header>
    );
  }
}
export default Header;
