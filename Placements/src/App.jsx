import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Navbar/Login/Login';
import Placements from './components/Navbar/Placements/Placements';
import TopRecruiters from './components/Navbar/TopRecruiters/TopRecruiters';
import TopPlacements from './components/Navbar/TopPlacements/TopPlacements';
import Home from './components/Navbar/Home/Home';
import LoginSignup from './components/Navbar/Login/Login';
import PersonDisplay from './components/Navbar/PersonDisplay/PersonDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/placements" element={<Placements />} />
                <Route path="/top-recruiters" element={<TopRecruiters />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<LoginSignup />} />
                <Route path="/top-placements" element={<TopPlacements />} />
                <Route path="/persondisplay/:item" element={<PersonDisplay />} />
            </Routes>
        </Router>
    );
};

export default App;



