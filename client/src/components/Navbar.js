import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser ,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "../App.css";
import logo from '../Assets/l.png';

function Navbar() {

    return (
        <nav className="nav" >
            <div className="logo">
                <Link to="/homepage"><img src={logo} alt="logo" /></Link>
            </div>
            <div id="nav-div">
                <div class="row" className="nav-links">
                    <Link to="/homepage" className="nav1"><FontAwesomeIcon icon={faHome} /></Link>
                    <Link to="/friends" className="nav2"><FontAwesomeIcon icon={faUsers} /></Link>
                    <Link to="/inbox" className="nav4"><FontAwesomeIcon icon={faEnvelope} /></Link>
                </div>
            <div id="user-icon">
                <Link to="/profile" className="nav3"><FontAwesomeIcon icon={faUser} /></Link>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;