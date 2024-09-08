// src/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faPlusCircle, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTachometerAlt} />
            
            <span>&nbsp;&nbsp;Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
            <span>&nbsp;&nbsp;Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/newcourse">
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>&nbsp;&nbsp;New Course</span>
          </Link>
        </li>
        <li>
          <Link to="/progress">
            <FontAwesomeIcon icon={faChartBar} />
            <span>&nbsp;&nbsp;Your Progress</span>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>&nbsp;&nbsp;Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
