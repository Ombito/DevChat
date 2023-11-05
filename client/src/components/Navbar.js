import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "../App.css";
import logo from '../Assets/l.png';

function Navbar() {
 
    return (
        <nav className="nav" >
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="nav-links">
                <Link to="/homepage" className="nav1"><FontAwesomeIcon icon={faHome} /></Link>
                <Link to="/friends" className="nav2"><FontAwesomeIcon icon={faUsers} /></Link>
                <Link to="/profile" className="nav3"><FontAwesomeIcon icon={faUser} /></Link>
            </div>
        </nav>
    );
}

export default Navbar;