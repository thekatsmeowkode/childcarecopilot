import { Link } from "react-router-dom";
import { useState } from 'react'
import Slider from "./Slider";

const Navbar = () => {
  const [checked, setIsChecked] = useState(true)

  return (
    <header>
      <div className="nav-bar">
        <Link to="/">
          <h1>Child Care Copilot</h1>
        </Link>
        <button>
          <Link to='/school'>School Info</Link>
        </button>
        <button>
          <Link to='/waitlist'>Waitlist</Link>
        </button>
        <div className="slider-container">
          <p>Students</p>
          <Slider checked={checked} setIsChecked={setIsChecked}></Slider>
          <p>Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
