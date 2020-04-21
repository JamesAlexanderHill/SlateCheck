/* global chrome */
//import assets
import React from 'react';
import './Checklist.css';
import Group from './Group';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'

class Checklist extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
      groups:null
    };
    //bind functions
    this.getGroupData = this.getGroupData.bind(this);
    this.getRandomID = this.getRandomID.bind(this);
    this.addGroup = this.addGroup.bind(this);

    if(this.props.debug == "true"){
      console.log("Checklist constructor()");
    }

    this.getGroupData();
  }
  componentDidMount() {
    if(this.props.debug == "true"){
      console.log("Checklist componentDidMount()");
    }
    //this.getGroupData();
  }

  //functions
  getGroupData(){
    if(this.props.debug == "true"){
      console.log("getGroupData(): ", this.props.idList);
    }
    chrome.storage.sync.get(this.props.idList, (result) => {
      if(this.props.debug == "true"){
        console.log("Loaded Groups from Chrome", result);
      }
      let groupArr = Object.values(result);
      if(groupArr.length > 0){
        this.setState({groups: groupArr});
      }
    });
  }
  getRandomID(length,chars,invalid){
    if(invalid == null){
      invalid = [];
    }
    let random = '';
    while(invalid.includes("sc-"+random) || random == ''){
      for (var i = length; i > 0; --i){
        random += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return "sc-"+random;
  }
  addGroup(){
    let tempGroup = {
      _id: this.getRandomID(5,"abcdefghijklmnopqrstuvwxyz", this.state.groups),
      title: null,
      showArchived: false,
      viewAssignments: true,
      isEdit: true,
      assignments: []
    }
    if(this.props.debug == "true"){
      console.log("addGroup(): ", tempGroup);
    }
    let temp = this.state.groups;
    if(temp == null){
      temp = [];
    }
    temp.push(tempGroup);
    this.props.addID(tempGroup._id);
    this.setState({groups: temp});
  }
  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("Checklist Render: ", this.state);
    }
    /*variables*/

    /*views*/
    let content;
    if(this.state.groups != null){
      content = this.state.groups.map((group, index)=>{
        return <Group key={group._id} data={group} debug={this.props.debug}/>;
      })
    }else{
      content = <p>Click the button below to add a group</p>;
      if(this.props.debug == "true"){
        console.log("Error: no groups in checklist", this.state);
      }
    }
    return (
      <div id="checklist">
        {content}
        <footer>
          <a href="http://slackcheck.com" target="_blank"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          <a onClick={this.addGroup}><FontAwesomeIcon icon={faFolderPlus} /></a>
          <a onClick={this.handleSettings}><FontAwesomeIcon icon={faCog} /></a>
        </footer>
      </div>
    );
  }
}
export default Checklist;
