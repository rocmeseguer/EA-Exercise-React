
import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="w3-bar w3-black">
            <Link className="w3-bar-item w3-button w3-mobile" to="/" >Home</Link>
            <Link className="w3-bar-item w3-button w3-mobile" to="/items" >My Elements</Link>
            <Link className="w3-bar-item w3-button w3-mobile" to="/items/1" >Element #1</Link>
        </div>
    );
  }

  export default NavBar;