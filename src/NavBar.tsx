import React from 'react';
import { Link } from "react-router-dom";


function NavBar() {
    return (
        <div>
            <ul>
                <li>
                    <Link  to="/" >Home</Link>
                </li>
                <li>
                    <Link  to="/items" >My Elements</Link>
                </li>
                <li>
                    <Link  to="/items/new" >New Element</Link>
                </li>
                <li>
                    <Link  to="/items/1" > Element #1</Link>
                </li>

            </ul>
        </div>
    );
  }

  export default NavBar;