/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home.jsx'

export default function Navbar() {
    return( 
        <div id="navbar">
          <Link to="/">Home</Link>
        </div>
    );
}