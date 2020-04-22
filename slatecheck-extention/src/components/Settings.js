//import assets
import React from 'react';
import './Settings.css';
import ImportExport from './ImportExport';

class Settings extends React.Component {
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
      console.log("Settings Render: ", this.state);
    }
    /*variables*/

    /*views*/

    return (
      <div id="settings">
        <ImportExport />
      </div>
    );
  }
}
export default Settings;
