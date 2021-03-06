/* global chrome */

import React from 'react';
import './Checklist.css';
import Group from './Group';
import Checklist_header from './Checklist_header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

class Checklist extends React.Component {
  constructor(props) {
    super(props);
    this.handleSettings = this.handleSettings.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.handleAssignmentUpdate = this.handleAssignmentUpdate.bind(this);
    this.state = {
      data2: [
        {
          name: "Group 1",
          show: false,
          viewHidden: true,
          isEdit: false,
          assignments:[
            {
              name:"Assignment 1",
              start: 1584212738253,
              finish: 1585508738253,
              done: false,
              show: false,
              isEdit: false
            },
            {
              name:"Assignment 2",
              start: 1584230738253,
              finish: 1586640021231,
              done: false,
              show: true,
              isEdit: false
            }
          ]
        },
        {
          name: "Group 2",
          show: false,
          viewHidden: false,
          isEdit: false,
          assignments:[
            {
              name:"Assignment 1",
              start: 1584731138253,
              finish: 1585560021231,
              done: false,
              show: true,
              isEdit: false
            },
            {
              name:"Assignment 2",
              start: 1584385538253,
              finish: 1585373896794,
              done: true,
              show: true,
              isEdit: false
            },
          ]
        },
      ],
      data:[]
    };
    //this.pushData(this.state.data);
    chrome.storage.sync.get(['tasks'], (result) => {
      console.log("Get Tasks");
      console.log(result.tasks.data);
      if(result.tasks.data != null){
        this.setState({
          data: result.tasks.data
        });
        console.log("Get Tasks = Success");
      }
    });
  }
  pushData(dataVar){
    let stateTemp = {
      data: dataVar
    }
    this.setState({
      data: stateTemp.data
    });
    chrome.storage.sync.set({tasks: stateTemp}, () => {
      console.log("Saved tasks to chrome");
    })
  }
  handleSettings(){
    this.props.settingsToggle();
  }
  addGroup(){
    console.log("add group");

    var groupTemp = {
      name: "Unnamed",
      show: false,
      viewHidden: true,
      isEdit: true,
      assignments:[]
    }
    let data = this.state.data;
    data.push(groupTemp);
    this.pushData(data);
  }
  handleAssignmentUpdate(newData, index){
    //console.log(newData);
    let data = this.state.data;
    data[index] = newData;
    this.pushData(data);
  }
  render() {
    const data = this.state.data;
    let groups;
    if(data == null || data == [] || data == ""){
      console.log("main: " + data + " - " + this.state.data);
      groups = <div className="no-groups">Please create a group and tasks to begin</div>;
    }else{
      console.log("main: " + data + " - " + this.state.data);
      groups = data.map((group, index) => {
        //console.log(group);
        return <Group group={group} index={index} key={index} updateAssignment={this.handleAssignmentUpdate} />
      })
    }
    //console.log(groups);
    return (
      <div className="Checklist">
        <Checklist_header title={this.props.title} user={this.props.account.username}/>
        <div className="Checklist-groups">
          {groups}
        </div>
        <footer className="Checklist_footer">
          <a href="http://slackcheck.com" target="_blank"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          <a onClick={this.addGroup}><FontAwesomeIcon icon={faFolderPlus} /></a>
          <a onClick={this.handleSettings}><FontAwesomeIcon icon={faCog} /></a>
        </footer>
      </div>
    );
  }
}
export default Checklist;
