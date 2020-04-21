/* global chrome */
//import assets
import React from 'react';
import './Group.css';
import Assignment from './Assignment';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

class Group extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
      _id: this.props.data._id,
      title: this.props.data.title,
      showArchived: this.props.data.showArchived,
      viewAssignments: this.props.data.viewAssignments,
      isEdit: this.props.data.isEdit,
      assignments: this.props.data.assignments
    };
    //bind functions
    this.handleViewArchiveToggle = this.handleViewArchiveToggle.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleGroupToggle = this.handleGroupToggle.bind(this);
    this.handleAssignmentUpdate = this.handleAssignmentUpdate.bind(this);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleSubmission = this.handleTitleSubmission.bind(this);

    this.doNothing = this.doNothing.bind(this);
    this.addAssignment = this.addAssignment.bind(this);

  }
  //functions
  saveStateChrome(data){
    console.log("Save: ", data);
    chrome.storage.sync.set({[data._id]: data}, () => {
      console.log("Group Saved to Chrome", data);
    })
  }
  doNothing(e){
    e.preventDefault();
    e.stopPropagation();
  }
  addAssignment(){
    let assTemp = {
      title:"",
      start: new Date().getTime(),
      finish: new Date().getTime(),
      done: false,
      archived: false,
      isEdit: true
    }
    let assignmentsTemp = this.state.assignments;
    assignmentsTemp.push(assTemp);
    this.setState({assignments: assignmentsTemp});
  }
  //handlers
  handleGroupToggle(){
    this.setState({viewAssignments: !this.state.viewAssignments});
  }
  handleViewArchiveToggle(e){
    e.stopPropagation();
    this.setState({showArchived: !this.state.showArchived});
  }
  handleEditToggle(e){
    if(e != null){
      e.stopPropagation();
    }
    if(this.state.isEdit){
      let temp = this.state;
      temp.isEdit = false;
      this.saveStateChrome(temp);
      this.setState({isEdit: false});
    }else{
      this.setState({isEdit: true});
    }
    //console.log("Edit Toggle: ", this.state);
    //this.setState({isEdit: !this.state.isEdit});
  }
  handleAssignmentUpdate(assignment, i){
    let temp = this.state.assignments;
    temp[i] = assignment;
    this.setState({assignments: temp});
    this.saveStateChrome(this.state);
  }
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleTitleSubmission(e){
    e.preventDefault();
    this.handleEditToggle();
  }
  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("Group Render: ", this.props.data._id ,this.state);
    }
    /*variables*/

    /*views*/
    let assignments;
    if(this.state.assignments.length >= 1){
      assignments = this.state.assignments.map((assignment, index)=>{
        return <Assignment key={index} data={assignment} index={index} assignmentUpdate={this.handleAssignmentUpdate} showArchived={this.state.showArchived} debug={this.props.debug}/>;
        //return <Assignment key={index} index={index} isEdit={isEdit} assignment={assignment} showHidden={viewHidden} assignmentChange={this.handleAssignmentChange} />;
      });
    }else{
      console.log("Error: no assignments in " + this.props.data._id);
    }

    let assignmentsAdd;
    if(this.state.isEdit){
      assignmentsAdd = <a class="assignmentAddBtn" onClick={this.addAssignment}><FontAwesomeIcon icon={faPlus} /></a>;
    }
    let dropdownIcon;
    if(!this.state.viewAssignments){
      assignments = "";
      assignmentsAdd = "";
      dropdownIcon = <FontAwesomeIcon icon={faChevronRight} />
    }else{
      dropdownIcon = <FontAwesomeIcon icon={faChevronDown} />
    }
    let viewArchiveColor;
    if(this.state.showArchived == true){
      viewArchiveColor = "blue-i"
    }
    let isEditIcon;
    let editTitle;
    let editIconColor = "default";
    if(this.state.isEdit == true){
      editIconColor = 'blue-i';
      editTitle = <form onSubmit={this.handleTitleSubmission}><input autofocus class="titleInput" type="text" value={this.state.title} placeholder="Group..." onClick={this.doNothing} onChange={this.handleTitleChange} /></form>
      isEditIcon = <FontAwesomeIcon icon={faSave} />;
    }else{
      let titleTemp;
      if(this.state.title == ""){
        titleTemp = <h2 class="folder-title-grey">Give me a name!</h2>;
      }else{
        titleTemp = <h2>{this.state.title}</h2>;
      }
      editTitle = titleTemp;
      isEditIcon = <FontAwesomeIcon icon={faEdit} />;
    }

    return (
      <div id={this.state._id} className="group-container">
        <a onClick={this.handleGroupToggle}>
          <div className="folder">
            {editTitle}
            <div className="icons">
              <div className="settings">
                <FontAwesomeIcon icon={faCog} />
                <div className="options">
                  <a class={viewArchiveColor} onClick={this.handleViewArchiveToggle}><FontAwesomeIcon icon={faArchive} /></a>
                  <a class={editIconColor} onClick={this.handleEditToggle}>{isEditIcon}</a>
                </div>
              </div>
              {dropdownIcon}
            </div>
          </div>
        </a>
        <ul class="assignment-list">
          {assignments}
          {assignmentsAdd}
        </ul>
      </div>
    );
  }
}
export default Group;
