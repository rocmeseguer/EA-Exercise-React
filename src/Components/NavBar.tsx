import './NavBar.css';

import React from 'react';
import { Link } from "react-router-dom";


function NavBar() {
    return (
        <div>
            <ul className="navbar">
                <li className="navbar">
                    <Link  to="/" >Home</Link>
                </li>
                <li className="navbar">
                    <Link  to="/items" >My Elements</Link>
                </li>
                <li className="navbar">
                    <Link  to="/items/new" >New Element</Link>
                </li>
                <li className="navbar">
                    <Link  to="/items/1" > Element #1</Link>
                </li>

            </ul>
        </div>
    );
  }

  export default NavBar;