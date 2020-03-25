import React from 'react';
import './Checklist.css';
import Group from './Group';
import Checklist_header from './Checklist_header';

const user = 'Guest';

function Checklist(props) {
  return (
    <div className="Checklist">
      <Checklist_header user={user}/>
      <div className="Checklist-groups">
        {/* Request all Units */}
        <Group name="Group 1" />
        <Group name="Group 2" />
        <Group name="Group 3" />
      </div>
      <footer>
        <button>Website</button><button>Settings</button>
      </footer>
    </div>
  );
}
export default Checklist;
