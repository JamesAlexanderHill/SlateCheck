import React from 'react';
import './Assignment.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    let dateTemp = new Date(this.props.assignment.finish);
    let year = dateTemp.getFullYear();
    let month = ("0" + (dateTemp.getMonth() + 1)).slice(-2);
    let day = ("0" + dateTemp.getDate()).slice(-2);

    let dateTemp2 = new Date(this.props.assignment.start);
    let year2 = dateTemp2.getFullYear();
    let month2 = ("0" + (dateTemp2.getMonth() + 1)).slice(-2);
    let day2 = ("0" + dateTemp2.getDate()).slice(-2);
    console.log("INIT:", dateTemp, dateTemp2);
    this.state = {
      assignmentTitle: this.props.assignment.name,
      assignmentEnd: this.props.assignment.finish,
      assignmentStart: this.props.assignment.start,
      dateStr: year+"-"+month+"-"+day,
      dateStartStr:  year2+"-"+month2+"-"+day2,
    };
    this.handleDoneToggle = this.handleDoneToggle.bind(this);
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleAssignmentSave = this.handleAssignmentSave.bind(this);
    this.handleAssignmentTitleChange = this.handleAssignmentTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }
  getPercentage(in_min, in_max){
    console.log("PERCENT: ", in_min, in_max);
    console.log("DIFF: ", in_max - in_min);
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
  handleAssignmentSave(){
    let tempAss = this.props.assignment;
    tempAss.name = this.state.assignmentTitle;
    tempAss.start = this.state.assignmentStart;
    tempAss.finish = this.state.assignmentEnd;
    let i = this.props.index;
    this.props.assignmentChange(tempAss, i);
  }
  handleAssignmentTitleChange(event){
    this.setState({assignmentTitle: event.target.value});
  }
  handleDateChange(event){
    this.setState({assignmentEnd: event.target.valueAsNumber});
    let dateTemp = new Date(event.target.valueAsNumber);
    let year = dateTemp.getFullYear();
    let month = ("0" + (dateTemp.getMonth() + 1)).slice(-2);
    let day = ("0" + dateTemp.getDate()).slice(-2);
    this.setState({dateStr: year+"-"+month+"-"+day});
    console.log(event.target.valueAsNumber, year+"-"+month+"-"+day);
  }
  handleStartDateChange(event){
    this.setState({assignmentStart: event.target.valueAsNumber});
    let dateTemp = new Date(event.target.valueAsNumber);
    let year = dateTemp.getFullYear();
    let month = ("0" + (dateTemp.getMonth() + 1)).slice(-2);
    let day = ("0" + dateTemp.getDate()).slice(-2);
    this.setState({dateStartStr: year+"-"+month+"-"+day});
    console.log(event.target.valueAsNumber, year+"-"+month+"-"+day);
  }
  render() {
    const assignment = this.props.assignment;
    console.log(assignment.name);
    let percent = this.getPercentage(assignment.start, assignment.finish);
    let daysRemaining = this.getDaysRemaining(assignment.finish);
    let countdownStr = this.getTimelineString(assignment.finish);
    let status;
    let color;
    let progressColor = "progress";
    let show = assignment.show;
    let isEdit = this.props.isEdit;

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

    //if is edit
    let headerInput;
    let progressInput;
    if(isEdit){
      status = <input type="submit" value="Submit" />;
      headerInput = <input id="titleInput" type="text" value={this.state.assignmentTitle} onChange={this.handleAssignmentTitleChange} onClick={this.doNothing}/>;
      progressInput = <div class="dateInputs"><input type="date" id="startDate" onChange={this.handleStartDateChange} value={this.state.dateStartStr} /> <input type="date" id="dueDate" onChange={this.handleDateChange} value={this.state.dateStr}/></div>;
    }else{
      headerInput = <h3>{assignment.name} <span className={color}>{countdownStr}</span></h3>;
      progressInput = <div className={progressColor} style={{width: percent + '%'}}></div>
    }
    return (
      <form id="assignmentForm" onSubmit={this.handleAssignmentSave} className={containerClass}>
        <div className="data">
          {headerInput}
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
          {progressInput}
        </div>
      </form>
    );
  }
}
export default Assignment;
