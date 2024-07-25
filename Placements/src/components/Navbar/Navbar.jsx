import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('username');
        if (name) {
            setUsername(name);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1vOE8eAVm8E32Ew2s4pIeqH3JE6RO-gWdREcI4mFHNWnlisqCSAClvCZ_AW5twYBuTCIywyO7As6HMz_0At5eBbJgfIW1IlHGvnJ09FAJjwGFX66fSLvXIHwC3R9_qo8UABbavXoUjLa_fQ7k-c3gfpRMbQNLmnB-LeJlFJmb6sG_rWcVJNGadgHd/w400-h400/Indian%20Institute%20of%20Information%20Technology%20Bhopal.png" alt="Logo" /></NavLink>
            </div>
            <div className="navbar-user">
                {username ? `Hi, ${username}` : 'Guest ID'}
            </div>
            <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
                <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/placements" className="nav-item">Placements</NavLink>
                    <NavLink to="/top-recruiters" className="nav-item">Top Recruiters</NavLink>
                    <NavLink to="/top-placements" className="nav-item">Top Placements</NavLink>
                </div>
            </div>
            <div className={`navbar-login ${isOpen ? 'open' : ''}`}>
                {localStorage.getItem('auth-token') ?
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); localStorage.setItem('username','Guest ID') }}>Logout</button>
                    :
                    <Link to='/login'><button>Login</button></Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;
