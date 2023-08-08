import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages and components
import Home from "./pages/Home";
import SchoolInfo from "./pages/SchoolInfo";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Waitlist from "./pages/Waitlist";
import {Table} from 'react-bootstrap'

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
            <Route path="/waitlist" element={<Waitlist/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
