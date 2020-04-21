/* global _gaq */
//import assets
import React from 'react';
import './Assignment.css';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

class Assignment extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    //set state
    this.state = {
      title: this.props.data.title,
      start: this.props.data.start,
      finish: this.props.data.finish,
      timelineStr: this.getTimelineString(this.props.data.finish),
      isEdit: this.props.data.isEdit
    };
    //bind functions
    this.handleArchiveToggle = this.handleArchiveToggle.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleDoneToggle = this.handleDoneToggle.bind(this);

    this.handleAssignmentSubmission = this.handleAssignmentSubmission.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleFinishChange = this.handleFinishChange.bind(this);
  }
  componentDidMount() {
    this.timelineTimer = setInterval(
      () => this.tick(),
      60000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timelineTimer);
  }
  //functions
  tick() {
    this.setState({
      timelineStr: this.getTimelineString(this.state.finish)
    });
  }
  getTimelineString(end){
    var d = new Date();
    var t = d.getTime();
    //calculations
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
  getPercentage(in_min, in_max){
    var num = new Date().getTime();
    var out_max = 100;
    var out_min = 0;
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;;
  }
  getDaysRemaining(end){
    var day = 86400000;//1000*60*60*24
    var d = new Date();
    var t = d.getTime();
    return Math.round((end - t) / day);
  }
  millies_to_YYYY_MM_DD(millies){
    let date = new Date(millies);
    var y = date.getFullYear();
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var d = ("0" + date.getDate()).slice(-2);
    return y+"-"+m+"-"+d;
  }
  //handlers
  handleArchiveToggle(){
    let temp = this.props.data;
    temp.archived = !temp.archived;
    let i = this.props.index;
    this.props.assignmentUpdate(temp, i);
  }
  handleEditToggle(){
    if(this.state.isEdit){
      //save state data
      let temp = this.props.data;
      temp.title = this.state.title;
      temp.start = this.state.start;
      temp.finish = this.state.finish;
      temp.isEdit = false;
      let i = this.props.index;
      this.props.assignmentUpdate(temp, i);
    }
    this.setState({isEdit: !this.state.isEdit});
  }
  handleDoneToggle(){
    if(!this.props.data.done){
      _gaq.push(['_trackEvent', "Assignment", 'Completed']);
    }else{
      _gaq.push(['_trackEvent', "Assignment", 'Marked Incomplete']);
    }
    let temp = this.props.data;
    temp.done = !temp.done;
    let i = this.props.index;
    this.props.assignmentUpdate(temp, i);
  }
  handleAssignmentSubmission(e){
    e.preventDefault();
    console.log("click the save toggle to save your changes: ", this.state);
  }
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleStartChange(event) {
    this.setState({start: event.target.valueAsNumber});
  }
  handleFinishChange(event) {
    this.setState({finish: event.target.valueAsNumber});
  }

  render() {
    //debug
    if(this.props.debug == "true"){
      console.log("Assignment Render: ", this.state);
    }
    /*variables*/
    let countdownStr = this.getTimelineString(this.state.finish);
    let percent = this.getPercentage(this.state.start, this.state.finish);

    let daysRemaining = this.getDaysRemaining(this.state.finish);
    let status;
    let color;
    let progressColor = "progressBar ";
    if(daysRemaining > 5){
      color = "blue";
      progressColor += "bg-blue";
      status = "In Progress";
    }else if(this.state.finish > new Date().getTime()){
      color = "orange";
      progressColor += "bg-orange";
      status = "Important";
    }else{
      percent = 100;
      color = "red";
      progressColor += "bg-red";
      status = "Overdue";
    }
    if(this.props.data.done == true){
      percent = 100;
      color = "green";
      progressColor = "progressBar bg-green";
      status = "Done";
    }

    /*views*/
    let showArchived = this.props.showArchived;
    let displayClass ="assignment-container";
    if(showArchived == false && this.props.data.archived == true){
      displayClass += " hideAssignment";
    }
    let archiveIcon;
    if(this.props.data.archived == true){
      archiveIcon = <FontAwesomeIcon icon={faUndo} />;
    }else{
      archiveIcon = <FontAwesomeIcon icon={faFileExport} />;
    }
    let editIcon;
    let editTitle;
    let editDates;
    let editIconColor = "default";
    if(this.state.isEdit == true){
      displayClass += " editAssignment";
      status = "Don't forget to save";
      color = "red";
      editIconColor = 'blue-i'
      editTitle = <input autofocus class="titleInput" type="text" value={this.state.title} placeholder="Task..." onChange={this.handleTitleChange} />
      editDates = <div class="date-container"><input class="dateInput" type="date" value={this.millies_to_YYYY_MM_DD(this.state.start)} onChange={this.handleStartChange} /><FontAwesomeIcon icon={faLongArrowAltRight}/><input class="dateInput" type="date" value={this.millies_to_YYYY_MM_DD(this.state.finish)} onChange={this.handleFinishChange} /></div>;
      editIcon = <FontAwesomeIcon icon={faSave} />;
    }else{
      editTitle = <h3>{this.props.data.title} <span className={color}>{countdownStr}</span></h3>;
      editDates = <div className={progressColor} style={{width: percent + '%'}}></div>;
      editIcon = <FontAwesomeIcon icon={faEdit} />;
    }
    return (
      <form class={displayClass} onSubmit={this.handleAssignmentSubmission}>
        <div className="data">
          {editTitle}
          <div className="status">
            <p className={color}>{status}</p>
            <div className="options">
              <a onClick={this.handleArchiveToggle}>{archiveIcon}</a>
              <a><FontAwesomeIcon icon={faLink} /></a>
              <a className={editIconColor} onClick={this.handleEditToggle}>{editIcon}</a>
              <a className={color} onClick={this.handleDoneToggle}><FontAwesomeIcon icon={faCheckCircle} /></a>
            </div>
          </div>
        </div>
        <div className="timeline">
          {editDates}
        </div>
      </form>
    );
  }
}
export default Assignment;
