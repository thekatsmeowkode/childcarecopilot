import { Link } from "react-router-dom";
import Slider from "./Slider";

const Navbar = () => {
  return (
    <header>
      <div className="nav-bar">
        <Link to="/">
          <h1>Child Care Copilot</h1>
        </Link>
        <div className="slider-container">
          <p>Students</p>
          <Slider></Slider>
          <p>Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
