import React from 'react';
import './Group.css';
import Assignment from './Assignment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {headingInput: this.props.group.name};
    this.handleGroupToggle = this.handleGroupToggle.bind(this);
    this.handleGroupHiddenToggle = this.handleGroupHiddenToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.doNothing = this.doNothing.bind(this);
  }
  doNothing(e){
    e.preventDefault();
    e.stopPropagation();
  }
  handleGroupToggle(){
    let dataTemp = this.props.group;
    let index = this.props.index;
    dataTemp.show = !dataTemp.show;
    this.props.updateAssignment(dataTemp, index);
  }
  handleGroupHiddenToggle(e){
    e.preventDefault();
    e.stopPropagation();

    let dataTemp = this.props.group;
    let index = this.props.index;
    dataTemp.viewHidden = !dataTemp.viewHidden;
    this.props.updateAssignment(dataTemp, index);
  }
  handleEdit(e){
    e.preventDefault();
    e.stopPropagation();

    console.log("Edit");
    let dataTemp = this.props.group;
    let index = this.props.index;
    dataTemp.isEdit = !dataTemp.isEdit;
    this.props.updateAssignment(dataTemp, index);
  }
  handleHeadingChange(event){
    this.setState({headingInput: event.target.value});
  }
  handleSave(e){
    e.preventDefault();
    e.stopPropagation();

    console.log("Save");
    let dataTemp = this.props.group;
    let index = this.props.index;
    dataTemp.isEdit = !dataTemp.isEdit;
    dataTemp.name = this.state.headingInput;
    this.props.updateAssignment(dataTemp, index);
  }
  addAssignment(){
    console.log("Add Assignment");

    var assTemp = {
      name:"Unnamed",
      start: new Date().getTime(),
      finish: new Date().getTime(),
      done: false,
      show: true
    }
    let data = this.props.group;
    console.log(data);
    let index = this.props.index;
    //push new assignment to assignments array and then save
    data.assignments.push(assTemp);
    this.props.updateAssignment(data, index);
  }
  handleAssignmentChange(assignment, i){
    let dataTemp = this.props.group;
    dataTemp.assignments[i] = assignment;
    let index = this.props.index;
    this.props.updateAssignment(dataTemp, index);
  }
  render() {
    const data = this.props.group.assignments;
    const show = this.props.group.show;
    const viewHidden = this.props.group.viewHidden;
    const isEdit = this.props.group.isEdit;

    let assignments;
    if(data == null){
      assignments = <div className="no-groups">Please create a group and tasks to begin</div>;
    }else{
      assignments = data.map((assignment, index)=>{
        return <Assignment key={index} index={index} isEdit={isEdit} assignment={assignment} showHidden={viewHidden} assignmentChange={this.handleAssignmentChange} />;
      })
    }

    let icon;
    let assignmentClass;
    if(show){
      icon = <FontAwesomeIcon icon={faChevronDown} />;
      assignmentClass = "assignment-list show";
    }else{
      icon = <FontAwesomeIcon icon={faChevronRight} />;
      assignmentClass = "assignment-list hide";
    }

    let visionToggleColor;
    let visionToggleIcon;
    if(viewHidden){
      visionToggleIcon = <FontAwesomeIcon icon={faEyeSlash} />;
      visionToggleColor = "icon-blue";
    }else{
      visionToggleIcon = <FontAwesomeIcon icon={faEye} />;
    }

    //if isEdit is toggled
    let editIcon;
    let editIconColor;
    let editHeading;
    let assignmentsAdd;
    if(isEdit){
      editIcon = <a className={editIconColor} onClick={this.handleSave}><FontAwesomeIcon icon={faSave} /></a>;
      //title
      editHeading = <form class="headingInputForm" onSubmit={this.handleSave}><input id="headingInput" type="text" value={this.state.headingInput} onChange={this.handleHeadingChange} onClick={this.doNothing}/></form>;
      assignmentsAdd = <a class="assignmentAddBtn" onClick={this.addAssignment}><FontAwesomeIcon icon={faPlus} /></a>;
    }else{
      editIcon = <a className={editIconColor} onClick={this.handleEdit}><FontAwesomeIcon icon={faEdit} /></a>;
      editHeading = <h2>{this.props.group.name}</h2>;
    }


    //console.log(groups);
    return (
      <div className="Group">
        <a onClick={this.handleGroupToggle}>
          <div className="Group-folder">
            {editHeading}
            <div className="Group-container">
              <div className="Group-settingContainer">
                <FontAwesomeIcon icon={faCog} />
                <div className="Group-options">
                  <a className={visionToggleColor} onClick={this.handleGroupHiddenToggle}>{visionToggleIcon}</a>
                  {editIcon}
                </div>
              </div>
              {icon}
            </div>

          </div>
        </a>
        <ul className={assignmentClass}>
          {assignments}
          {assignmentsAdd}
        </ul>
      </div>
    );
  }
}
export default Group;
