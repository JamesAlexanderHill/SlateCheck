import React from 'react';
import './Assignment.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoneToggle = this.handleDoneToggle.bind(this);
  }
  getPercentage(in_min, in_max){
    var num = new Date().getTime();
    var out_max = 100;
    var out_min = 0;
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;;
  }
  getDaysRemaining(end){
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var d = new Date();
    var t = d.getTime();

    return Math.round((end - t) / days);
  }
  handleDoneToggle(){
    let tempAss = this.props.assignment;
    tempAss.done = !tempAss.done;
    let i = this.props.index;

    this.props.assignmentChange(tempAss, i);
  }
  render() {
    const assignment = this.props.assignment;
    console.log("Assignment");
    console.log(assignment);
    //get percentage
    let percent = this.getPercentage(assignment.start, assignment.finish);
    console.log("percent");
    console.log(percent);
    //get days remaining
    let daysRemaining = this.getDaysRemaining(assignment.finish);
    console.log("Days");
    console.log(daysRemaining);
    //get status
    let status;

    let color;
    let progressColor = "progress";
    if(daysRemaining > 5){
      color = "blue";
      progressColor += " bg-blue";
      status = "In Progress";
    }else if(5 > daysRemaining && daysRemaining > 0){
      color = "orange";
      progressColor += " bg-orange";
      status = "Important";
    }else{
      percent = 100;
      color = "red";
      progressColor += " bg-red";
      status = "Overdue";
    }

    if(assignment.done){
      percent = 100;
      color = "green";
      progressColor += " bg-green";
      status = "Done";
    }
    return (
      <div className="Assignment">
        <div className="data">
          <h3>{assignment.name}</h3>
          <div className="status">
            <p className={color}>{status}</p>
            <div className="options">
              <a><FontAwesomeIcon icon={faEye} /></a>
              <a><FontAwesomeIcon icon={faLink} /></a>
              <a className={color}  onClick={this.handleDoneToggle}><FontAwesomeIcon icon={faCheckCircle} /></a>
            </div>
          </div>
        </div>
        <div className="timeline">
          <div className={progressColor} style={{width: percent + '%'}}></div>
        </div>
      </div>
    );
  }
}
export default Assignment;
