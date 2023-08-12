import { Link } from "react-router-dom";
import { useState } from "react";
import Slider from "../Slider";
import BirthdayPopover from "./BirthdayPopover";
import copilotLogo from '../../assets/copilot_logo.png'

const Navbar = () => {
  const [checked, setIsChecked] = useState(true);

  return (
    <header>
      <div className="nav-bar">
        <Link to="/">
          <h1>Child Care Copilot</h1>
        </Link>
        <img className="logo" src={copilotLogo} alt="baby riding on a spaceship that looks like a baby bottle"/>
        <button>
          <Link to="/school">School Info</Link>
        </button>
        <button>
          <Link to="/waitlist">Waitlist</Link>
        </button>
        <button>
          <Link to="/time-traveler">See the future</Link>
        </button>
        <div className="slider-container">
          <p>Students</p>
          <Slider checked={checked} setIsChecked={setIsChecked}></Slider>
          <p>Dashboard</p>
        </div>
        <BirthdayPopover />
      </div>
    </header>
  );
};

export default Navbar;
