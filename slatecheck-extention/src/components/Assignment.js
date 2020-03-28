import React from 'react';
import './Assignment.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoneToggle = this.handleDoneToggle.bind(this);
    this.handleShowToggle = this.handleShowToggle.bind(this);
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
  getTimelineString(end){
    var d = new Date();
    var t = d.getTime();

    var delta = Math.abs(end - t) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = delta % 60;

    return "- " + days + " days " + hours + " hours " + minutes + " mins";
  }
  handleDoneToggle(){
    let tempAss = this.props.assignment;
    tempAss.done = !tempAss.done;
    let i = this.props.index;

    this.props.assignmentChange(tempAss, i);
  }
  handleShowToggle(){
    let tempAss = this.props.assignment;
    tempAss.show = !tempAss.show;
    let i = this.props.index;

    this.props.assignmentChange(tempAss, i);
  }
  render() {
    const assignment = this.props.assignment;
    let percent = this.getPercentage(assignment.start, assignment.finish);
    let daysRemaining = this.getDaysRemaining(assignment.finish);
    let countdownStr = this.getTimelineString(assignment.finish);
    let status;
    let color;
    let progressColor = "progress";
    let show = assignment.show;

    if(daysRemaining > 5){
      color = "blue";
      progressColor += " bg-blue";
      status = "In Progress";
    }else if(assignment.finish > new Date().getTime()){
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
      countdownStr = "";
      percent = 100;
      color = "green";
      progressColor += " bg-green";
      status = "Done";
    }
    let showToggleColor;
    let showIcon;
    if(!show){
      showToggleColor="icon-blue";
    }
    let containerClass;
    if(this.props.showHidden || show){
      containerClass = "Assignment showAssignment"
    }else{
      containerClass = "Assignment hideAssignment"
    }
    return (
      <div className={containerClass}>
        <div className="data">
          <h3>{assignment.name} <span className={color}>{countdownStr}</span></h3>
          <div className="status">
            <p className={color}>{status}</p>
            <div className="options">
              <a className={showToggleColor} onClick={this.handleShowToggle}><FontAwesomeIcon icon={faEyeSlash} /></a>
              <a><FontAwesomeIcon icon={faLink} /></a>
              <a className={color} onClick={this.handleDoneToggle}><FontAwesomeIcon icon={faCheckCircle} /></a>
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
