import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages and components
import Home from "./pages/Home";
import SchoolInfo from "./pages/SchoolInfo";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import Waitlist from "./pages/Waitlist";
import TimeTraveler from "./pages/TimeTraveler";
import DeveloperTools from "./pages/DeveloperTools";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/school" element={<SchoolInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/time-traveler" element={<TimeTraveler />} />
            <Route path="/easter-egg" element={<DeveloperTools />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
