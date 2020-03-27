import React from 'react';
import './Checklist_header.css';

const user = 'James Hill';

function Checklist_header(props) {
  return (
    <header className="Checklist-header">
      <h1>{props.title}</h1>
      <p>{props.user}</p>
    </header>
  );
}
export default Checklist_header;
