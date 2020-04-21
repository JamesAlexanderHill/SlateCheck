/* global chrome */
//import assets
import React from 'react';
import './App.css';
import Checklist from './components/Checklist';

class App extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
      idList: null
    };
    //bind functions
    this.getIDs = this.getIDs.bind(this);
    this.setIDs = this.setIDs.bind(this);
    this.updateIDs = this.updateIDs.bind(this);

    if(this.props.debug == "true"){
      console.log("App constructor()");
    }

    this.getIDs();
  }
  componentDidMount() {
    if(this.props.debug == "true"){
      console.log("App componentDidMount()");
    }
    //this.getIDs();
  }

  //functions
  getIDs(){
    if(this.props.debug == "true"){
      console.log("getIDs(): ");
    }
    chrome.storage.sync.get(['slateCheckData'], (result) => {
      if(this.props.debug == "true"){
        console.log("Loaded slateCheckData from Chrome", result);
      }
      if(result.slateCheckData == undefined){
        this.setState({idList: []});
      }else{
        this.setState({idList: result.slateCheckData.idList});
      }
    });
  }
  setIDs(){
    chrome.storage.sync.set({slateCheckData: this.state}, () => {
      console.log("slateCheckData Saved to Chrome", this.state);
    })
  }
  updateIDs(id){
    console.log("updateIDs()", id);
    let temp = this.state.idList;
    temp.push(id);
    this.setState({idList: temp});
    this.setIDs();
    console.log("App idList", this.state.idList);
  }
  //handlers

  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("App Render: ", this.state);
    }
    //logic
    //views
    let content = <p>Loading IDs</p>;
    if(this.state.idList != null){
      content = <Checklist idList={this.state.idList} addID={this.updateIDs} debug={this.props.debug}/>;
    }
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
