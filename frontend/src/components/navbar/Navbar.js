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
        <Link
          to="/school"
          onClick={() => {
            console.info(
              "Edit school rules like ratio, square footage, on school metric page."
            );
          }}
        >
          Edit School Metrics
        </Link>
        <Link
          onClick={() => {
            console.info(
              "See children waiting to be enrolled on the waitlist page"
            );
          }}
          to="/waitlist"
        >
          Waitlist
        </Link>
        <Link
          onClick={() => {
            console.info(
              "See how many children will be a selected number of months old by a date on the time traveler page"
            );
          }}
          to="/time-traveler"
        >
          See the future
        </Link>
        <Link
          to="/"
          onClick={() => {
            console.info(
              "See the currently enrolled students on the students page."
            );
          }}
        >
          Students
        </Link>
        <Link
          to="/dashboard"
          onClick={() => {
            console.info(
              "See data about the school enrollment, revenue, capacity and food requirements on the dashboard page."
            );
          }}
        >
          Dashboard
        </Link>
        <BirthdayPopover />
      </div>
    </header>
  );
};

export default Navbar;
