import { Link } from "react-router-dom";
import { useState } from "react";
import BirthdayPopover from "./BirthdayPopover";
import copilotLogo from "../../assets/copilot_logo.png";

const Navbar = () => {
  return (
    <header>
      <div className="nav-bar">
        <img
          className="logo"
          src={copilotLogo}
          alt="baby riding on a spaceship that looks like a baby bottle"
        />
        <Link to="/">
          <h1>Child Care Copilot</h1>
        </Link>
        <Link to="/school">Edit School Metrics</Link>
        <Link to="/waitlist">Waitlist</Link>
        <Link to="/time-traveler">See the future</Link>
        <Link to="/">Students</Link>
        <Link to="/dashboard">Dashboard</Link>
        <BirthdayPopover />
      </div>
    </header>
  );
};

export default Navbar;
