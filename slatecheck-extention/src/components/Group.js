import React from 'react';
import './Group.css';

function Group(props) {
  return (
    <div className="Group">
      <h2>{props.name}</h2>
    </div>
  );
}

export default Group;
