import { Link } from "react-router-dom";
import BirthdayPopover from "./BirthdayPopover";
import copilotLogo from "../../assets/copilot_logo.png";

const Navbar = () => {
  return (
    <header>
      <div className="nav-bar">
        <a href="https://www.linkedin.com/in/jayriverking/">
          <img
            className="logo"
            src={copilotLogo}
            alt="baby riding on a spaceship that looks like a baby bottle"
          />
        </a>
        <Link to="/">
          <h1>Child Care Copilot</h1>
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
          to="/school"
          onClick={() => {
            console.info(
              "Edit school rules like ratio, square footage, on school metric page."
            );
          }}
        >
          School Metrics
        </Link>
        <Link
          to="https://childcare-aware-weather-app.netlify.app/"
          className="material-symbols-outlined"
          onClick={() => {
            console.info(
              "Go to an external website that tells you if it is safe for children to go outdoors from your zip code"
            );
          }}
        >
          device_thermostat
        </Link>
        <BirthdayPopover />
      </div>
    </header>
  );
};

export default Navbar;
