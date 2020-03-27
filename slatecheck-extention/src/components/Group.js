import React from 'react';
import './Group.css';
import Assignment from './Assignment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.handleGroupToggle = this.handleGroupToggle.bind(this);
    this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
  }
  handleGroupToggle(){
    let dataTemp = this.props.group;
    let index = this.props.index;
    //toggle value
    //console.log("Toggle data");
    dataTemp.show = !dataTemp.show;
    //console.log(dataTemp);
    this.props.updateAssignment(dataTemp, index);
  }
  handleAssignmentChange(assignment, i){
    let dataTemp = this.props.group;
    dataTemp.assignments[i] = assignment;
    let index = this.props.index;
    //toggle value
    //console.log("Toggle data");
    //console.log(dataTemp);
    this.props.updateAssignment(dataTemp, index);
  }
  render() {
    const data = this.props.group.assignments;
    const show = this.props.group.show;

    let assignments;
    if(data == null){
      assignments = <div className="no-groups">Please create a group and tasks to begin</div>;
    }else{
      assignments = data.map((assignment, index)=>{
        //onsole.log(assignment);
        return <Assignment key={index} index={index} assignment={assignment} assignmentChange={this.handleAssignmentChange} />;
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



    //console.log(groups);
    return (
      <div className="Group">
        <a onClick={this.handleGroupToggle}>
          <div className="Group-folder">
            <h2>{this.props.group.name}</h2>
            {icon}
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
