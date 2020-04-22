//import assets
import React from 'react';

class ImportExport extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
      exportAll: true
    };
    //bind functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExportSubmission = this.handleExportSubmission.bind(this);
  }

  //functions

  //handlers
  handleInputChange(event) {

    const target = event.target;
    const value = target.checked;
    const name = target.name;
    console.log("handleInputChange(): ",name, value);
    this.setState({
      [name]: value
    });
  }
  handleExportSubmission(e){
    e.preventDefault();
    console.log("Export data: ", this.state);
  }

  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("ImportExport Render: ", this.state);
    }
    /*variables*/
    let showExportGroups = this.state.exportAll ? "none" : "block";
    console.log("showExportGroups value: ",showExportGroups);
    let groups;

    /*views*/
    groups = "";

    return (
      <div id="import-export">
        <h2>Import Groups and Assignments (.json)</h2>
        <form>
          <input type="file" />
          <input type="submit" value="Import" />
        </form>
        <h2>Export Groups and Assignments (.json)</h2>
        <form onSubmit={this.handleExportSubmission}>
          <label>
            Export all Groups:
            <input
              name="exportAll"
              type="checkbox"
              checked={this.state.exportAll}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <div style={{display: showExportGroups}}>
            <p>Select groups to export:</p>
            {groups}
          </div>
          <input type="submit" value="Export" />
        </form>
      </div>
    );
  }
}
export default ImportExport;
