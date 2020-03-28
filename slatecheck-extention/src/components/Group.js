import React from 'react';
import './Group.css';
import Assignment from './Assignment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.handleGroupToggle = this.handleGroupToggle.bind(this);
    this.handleGroupHiddenToggle = this.handleGroupHiddenToggle.bind(this);
    this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
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

    let assignments;
    if(data == null){
      assignments = <div className="no-groups">Please create a group and tasks to begin</div>;
    }else{
      assignments = data.map((assignment, index)=>{
        return <Assignment key={index} index={index} assignment={assignment} showHidden={viewHidden} assignmentChange={this.handleAssignmentChange} />;
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


    //console.log(groups);
    return (
      <div className="Group">
        <a onClick={this.handleGroupToggle}>
          <div className="Group-folder">
            <h2>{this.props.group.name}</h2>
            <div className="Group-container">
              <div className="Group-settingContainer">
                <FontAwesomeIcon icon={faCog} />
                <div className="Group-options">
                  <a className={visionToggleColor} onClick={this.handleGroupHiddenToggle}>{visionToggleIcon}</a>
                  <a><FontAwesomeIcon icon={faEdit} /></a>
                </div>
              </div>
              {icon}
            </div>

          </div>
        </a>
        <ul className={assignmentClass}>
          {assignments}
        </ul>
      </div>
    );
  }
}
export default Group;
