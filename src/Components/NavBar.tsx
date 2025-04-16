
import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar is-black">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/items">My Elements</Link>
                </div>
            </div>
        </nav>
    );
  }

  export default NavBar;