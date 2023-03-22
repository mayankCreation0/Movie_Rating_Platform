import React, { useContext, useState } from "react";
// import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import "../styles/Navbar.css";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Navbar = () => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const { auth, setAuth } = useContext(Context)
    const handleClick = () => setClick(!click);
    function refreshPage() {
        setAuth(false)
    }
    const navigateto = () => {
        navigate('/login')
    }
    const closeMobileMenu = () => setClick(false);
    return (
        <>
            <div className="header">
                <div className="logo-nav">
                    <div className="logo-container">
                        <Link to="banner">
                            <img src="https://w7.pngwing.com/pngs/90/19/png-transparent-film-cinema-movies-miscellaneous-text-logo-thumbnail.png" alt="logo" style={{width:"80px" , backgroundColor:"black", borderRadius:"20px"}}/>
                        </Link>
                    </div>
                    <ul className={click ? "nav-options active" : "nav-options"}>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link to="#" style={{ color: "white", textDecoration: "none",opacity:"1" }}>Rate Movies</Link>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <Link to="#" style={{ color: "white", textDecoration: "none" }} >ABOUT</Link>
                        </li>
                        <li className="option mobile-option" onClick={closeMobileMenu}>
                            <Link to="/login" className="sign-up">
                                <button style={{border:"1px solid white"}} onClick={refreshPage}>{!auth ? "Logout" : "Login"}</button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div class="search-container">
                </div>
                <div className="mobile-menu" onClick={handleClick}>
                    {click ? (
                        <MenuIcon className="menu-icon" />
                    ) : (
                        <MenuIcon className="menu-icon" />
                    )}
                </div>
                <ul className="signin-up">
                    <li className="sign-in" onClick={closeMobileMenu}>
                        <Link to="/">
                            <img
                                src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                                alt="img"
                                style={{ width: "50px", borderRadius: "50%", backgroundColor: 'lightcoral' }}
                            />
                        </Link>
                    </li>
                    <li onClick={closeMobileMenu}>
                        <Link to="login" >
                            <button style={{ border: "1px solid white" }} className="signup-btn" onClick={auth ? refreshPage : navigateto}>{auth ? "Logout" : "Login"}</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;